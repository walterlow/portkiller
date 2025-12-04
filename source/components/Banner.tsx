import React from 'react';
import { Box, Text } from 'ink';

const ASCII_ART = `
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
`;

const COLORS = ['#ff4500', '#ff6a00', '#ff8c00', '#ffa500', '#ffb732', '#ffcc66'];

export function Banner() {
  const lines = ASCII_ART.trim().split('\n');

  return (
    <Box flexDirection="column" marginBottom={1}>
      {lines.map((line, index) => (
        <Text key={index} color={COLORS[index % COLORS.length]} bold>
          {line}
        </Text>
      ))}
      <Box marginTop={1}>
        <Text dimColor>  Find and kill processes hogging your ports</Text>
      </Box>
    </Box>
  );
}
