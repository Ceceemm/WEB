import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
      verbose: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild
          ? undefined
          : {
              "vendor-react": ["react", "react-dom"],
              "vendor-ui": ["lucide-react"],
            },
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name ?? "")) {
            return "images/[name]-[hash][extname]";
          }
          if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name ?? "")) {
            return "fonts/[name]-[hash][extname]";
          }
          return "assets/[hash][extname]";
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    css: true,
  },
}));
