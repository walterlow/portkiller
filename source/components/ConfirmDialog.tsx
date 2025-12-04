import React from 'react';
import { Box, Text, useInput } from 'ink';
import { ProcessInfo } from '../utils/process.js';

interface ConfirmDialogProps {
  process?: ProcessInfo;
  processCount?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ process, processCount, onConfirm, onCancel }: ConfirmDialogProps) {
  useInput((input) => {
    if (input === 'y' || input === 'Y') {
      onConfirm();
    } else if (input === 'n' || input === 'N' || input === 'q') {
      onCancel();
    }
  });

  const isKillAll = !process && processCount !== undefined;

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="#ff4500"
      paddingX={2}
      paddingY={1}
      marginY={1}
    >
      <Box marginBottom={1}>
        <Text color="#ff4500" bold>
          {isKillAll ? '⚠ CONFIRM KILL ALL' : '⚠ CONFIRM KILL'}
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        {isKillAll ? (
          <Text>
            Are you sure you want to kill{' '}
            <Text color="#ff4500" bold>ALL {processCount} processes</Text>?
          </Text>
        ) : process && (
          <>
            <Text>
              Are you sure you want to kill process{' '}
              <Text color="#ffa500" bold>{process.name}</Text>?
            </Text>
            <Box marginTop={1}>
              <Text dimColor>PID: </Text>
              <Text color="#ffb732">{process.pid}</Text>
              <Text dimColor>  Port: </Text>
              <Text color="#ffcc66">{process.port}</Text>
            </Box>
          </>
        )}
      </Box>

      <Box>
        <Text>
          Press <Text color="#ffa500" bold>[Y]</Text> to confirm or{' '}
          <Text color="#ff4500" bold>[N]</Text> to cancel
        </Text>
      </Box>
    </Box>
  );
}
