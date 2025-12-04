import React from 'react';
import { Box, Text } from 'ink';

interface StatusBarProps {
  mode: 'input' | 'scanning' | 'results' | 'confirm';
  processCount?: number;
}

export function StatusBar({ mode, processCount = 0 }: StatusBarProps) {
  const shortcuts: Record<string, string> = {};

  switch (mode) {
    case 'input':
      shortcuts['Enter'] = 'Scan';
      shortcuts['Ctrl+C'] = 'Exit';
      break;
    case 'scanning':
      shortcuts['Ctrl+C'] = 'Cancel';
      break;
    case 'results':
      shortcuts['↑↓'] = 'Navigate';
      shortcuts['Enter/K'] = 'Kill';
      if (processCount > 1) {
        shortcuts['A'] = 'Kill All';
      }
      shortcuts['R'] = 'Rescan';
      shortcuts['Esc'] = 'Back';
      shortcuts['Q'] = 'Quit';
      break;
    case 'confirm':
      shortcuts['Y'] = 'Confirm';
      shortcuts['N/Esc'] = 'Cancel';
      break;
  }

  return (
    <Box
      borderStyle="single"
      borderColor="#663300"
      paddingX={1}
      marginTop={1}
    >
      {Object.entries(shortcuts).map(([key, action], index) => (
        <Box key={key} marginRight={2}>
          <Text color="#ff8c00" bold>[{key}]</Text>
          <Text dimColor> {action}</Text>
          {index < Object.entries(shortcuts).length - 1 && (
            <Text dimColor>  </Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
