# portkiller

Interactive CLI tool to find and kill processes by port. Built with [React Ink](https://github.com/vadimdemedes/ink).

![portkiller demo](https://img.shields.io/npm/v/@walterlow/portkiller?color=orange&style=flat-square)

```
  ██████╗  ██████╗ ██████╗ ████████╗
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
  ██████╔╝██║   ██║██████╔╝   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║
  ██║     ╚██████╔╝██║  ██║   ██║
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝
  ██╗  ██╗██╗██╗     ██╗     ███████╗██████╗
  ██║ ██╔╝██║██║     ██║     ██╔════╝██╔══██╗
  █████╔╝ ██║██║     ██║     █████╗  ██████╔╝
  ██╔═██╗ ██║██║     ██║     ██╔══╝  ██╔══██╗
  ██║  ██╗██║███████╗███████╗███████╗██║  ██║
  ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
```

## Install

```bash
npm install -g @walterlow/portkiller
```

Or run directly with npx:

```bash
npx @walterlow/portkiller
```

## Usage

```bash
portkiller
```

1. Enter a port number to scan
2. Navigate with arrow keys to select a process
3. Press `Enter` or `K` to kill, or `A` to kill all

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↑` `↓` | Navigate process list |
| `Enter` / `K` | Kill selected process |
| `A` | Kill all processes (when multiple found) |
| `R` | Rescan current port |
| `Q` | Quit |
| `Y` / `N` | Confirm / Cancel kill |

## Features

- Scan any port for running processes
- View process details (PID, name, protocol, address)
- Kill individual processes or all at once
- Cross-platform support (Windows & Unix)
- Beautiful orange-themed UI

## Requirements

- Node.js 18+
- Windows: Uses `netstat` and `taskkill`
- Unix/Mac: Uses `lsof` and `kill`

## Development

```bash
# Clone the repo
git clone https://github.com/walterlow/portkiller.git
cd portkiller

# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build
npm run build
```

## License

MIT
