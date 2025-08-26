import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development mode
    return {
      plugins: [react()],
      server: {
        port: 3000,
        host: true,
        cors: true,
      },
    };
  } else {
    // Build mode
    return {
      plugins: [react()],
      build: {
        sourcemap: false,
        outDir: `./dist`,
        emptyOutDir: true,
      },
    };
  }
});
