#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './app.js';

// Enter alternate screen buffer (like vim/less)
process.stdout.write('\x1b[?1049h');
process.stdout.write('\x1b[H'); // Move cursor to home

const { unmount, waitUntilExit } = render(<App />);

waitUntilExit().then(() => {
  // Exit alternate screen buffer
  process.stdout.write('\x1b[?1049l');
});
