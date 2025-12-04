import React from 'react';
import { Box, Text } from 'ink';
import InkSpinner from 'ink-spinner';

interface SpinnerProps {
  port: number;
}

export function Spinner({ port }: SpinnerProps) {
  return (
    <Box marginY={1}>
      <Text color="#ff8c00">
        <InkSpinner type="dots" />
      </Text>
      <Text> Scanning port </Text>
      <Text color="#ffa500" bold>{port}</Text>
      <Text>...</Text>
    </Box>
  );
}
