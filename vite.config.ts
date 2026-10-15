import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      // Tiled creates locked atomic-save files such as `map.tmx.<suffix>`.
      // They are temporary and should not be watched by Vite on Windows.
      ignored: ['**/*.tmx.*']
    }
  }
});
