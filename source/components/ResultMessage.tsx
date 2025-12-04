import React, { useEffect } from 'react';
import { Box, Text } from 'ink';

interface ResultMessageProps {
  success: boolean;
  message: string;
  onDismiss: () => void;
}

export function ResultMessage({ success, message, onDismiss }: ResultMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <Box
      borderStyle="round"
      borderColor={success ? '#ffa500' : '#ff4500'}
      paddingX={2}
      paddingY={1}
      marginY={1}
    >
      <Text color={success ? '#ffa500' : '#ff4500'}>
        {success ? '✓ ' : '✗ '}
      </Text>
      <Text>{message}</Text>
    </Box>
  );
}
