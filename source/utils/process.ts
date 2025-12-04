import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface ProcessInfo {
  pid: number;
  name: string;
  port: number;
  protocol: string;
  localAddress: string;
}

export async function findProcessesByPort(port: number): Promise<ProcessInfo[]> {
  const isWindows = process.platform === 'win32';

  if (isWindows) {
    return findProcessesByPortWindows(port);
  } else {
    return findProcessesByPortUnix(port);
  }
}

async function findProcessesByPortWindows(port: number): Promise<ProcessInfo[]> {
  try {
    // Get network connections with PIDs
    const { stdout: netstatOutput } = await execAsync(`netstat -ano | findstr :${port}`);
    const lines = netstatOutput.trim().split('\n').filter((line: string) => line.trim());

    const pidSet = new Set<number>();
    const connections: { pid: number; protocol: string; localAddress: string }[] = [];

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5) {
        const protocol = parts[0];
        const localAddress = parts[1];
        const pid = parseInt(parts[parts.length - 1], 10);

        // Check if this is actually for our port
        if (localAddress.includes(`:${port}`) && !isNaN(pid) && pid > 0) {
          if (!pidSet.has(pid)) {
            pidSet.add(pid);
            connections.push({ pid, protocol, localAddress });
          }
        }
      }
    }

    // Get process names for each PID
    const processes: ProcessInfo[] = [];
    for (const conn of connections) {
      try {
        const { stdout: tasklistOutput } = await execAsync(`tasklist /FI "PID eq ${conn.pid}" /FO CSV /NH`);
        const match = tasklistOutput.match(/"([^"]+)"/);
        const name = match ? match[1] : 'Unknown';

        processes.push({
          pid: conn.pid,
          name,
          port,
          protocol: conn.protocol,
          localAddress: conn.localAddress,
        });
      } catch {
        processes.push({
          pid: conn.pid,
          name: 'Unknown',
          port,
          protocol: conn.protocol,
          localAddress: conn.localAddress,
        });
      }
    }

    return processes;
  } catch {
    return [];
  }
}

async function findProcessesByPortUnix(port: number): Promise<ProcessInfo[]> {
  try {
    const { stdout } = await execAsync(`lsof -i :${port} -P -n 2>/dev/null || true`);
    const lines = stdout.trim().split('\n').slice(1); // Skip header

    const processes: ProcessInfo[] = [];
    const pidSet = new Set<number>();

    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length >= 9) {
        const name = parts[0];
        const pid = parseInt(parts[1], 10);
        const protocol = parts[7]?.includes('TCP') ? 'TCP' : 'UDP';
        const localAddress = parts[8] || '';

        if (!isNaN(pid) && !pidSet.has(pid)) {
          pidSet.add(pid);
          processes.push({ pid, name, port, protocol, localAddress });
        }
      }
    }

    return processes;
  } catch {
    return [];
  }
}

export async function killProcess(pid: number): Promise<{ success: boolean; message: string }> {
  const isWindows = process.platform === 'win32';

  try {
    if (isWindows) {
      await execAsync(`taskkill /PID ${pid} /F`);
    } else {
      await execAsync(`kill -9 ${pid}`);
    }
    return { success: true, message: `Process ${pid} terminated successfully` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    if (message.includes('Access is denied') || message.includes('Operation not permitted')) {
      return { success: false, message: `Permission denied. Try running as administrator.` };
    }
    return { success: false, message: `Failed to kill process: ${message}` };
  }
}
