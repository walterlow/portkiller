import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

interface PortInputProps {
  onSubmit: (port: number) => void;
}

export function PortInput({ onSubmit }: PortInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (input: string) => {
    const port = parseInt(input, 10);

    if (isNaN(port)) {
      setError('Please enter a valid number');
      return;
    }

    if (port < 1 || port > 65535) {
      setError('Port must be between 1 and 65535');
      return;
    }

    setError(null);
    onSubmit(port);
  };

  return (
    <Box flexDirection="column" marginY={1}>
      <Box>
        <Text color="#ff8c00" bold>{'❯ '}</Text>
        <Text>Enter port to scan: </Text>
        <TextInput
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          placeholder="3000"
        />
      </Box>
      {error && (
        <Box marginTop={1}>
          <Text color="#ff4500">  ✗ {error}</Text>
        </Box>
      )}
      <Box marginTop={1}>
        <Text dimColor>  Press Enter to scan</Text>
      </Box>
    </Box>
  );
}
