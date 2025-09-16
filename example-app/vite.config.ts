import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'firebase/messaging': path.resolve(__dirname, 'src/shims/firebase-messaging-empty.ts'),
      'firebase/messaging/sw': path.resolve(__dirname, 'src/shims/firebase-messaging-empty.ts'),
    },
  },
});
