import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/, // 👈 Allow JSX in .js files
    }),
  ],
  esbuild: {
    loader: "jsx",
    include: [
      "src/**/*.js",
      "src/**/*.jsx",
      "node_modules/**/*.js",
      "node_modules/**/*.jsx",
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx", // 👈 Treat .js as JSX
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
+ // Add this define section to fix the "process is not defined" error
+ define: {
+   'process.env': {},
+   'process': { env: {} },
+   'global': {}
+ }
});