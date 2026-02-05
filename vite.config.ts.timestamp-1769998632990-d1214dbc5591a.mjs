// vite.config.ts
import { defineConfig } from "file:///D:/Trae_project/smart_croop/node_modules/vite/dist/node/index.js";
import path from "path";
import react from "file:///D:/Trae_project/smart_croop/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Trae_project\\smart_croop";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3e3
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUcmFlX3Byb2plY3RcXFxcc21hcnRfY3Jvb3BcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRyYWVfcHJvamVjdFxcXFxzbWFydF9jcm9vcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVHJhZV9wcm9qZWN0L3NtYXJ0X2Nyb29wL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIEFsaWFzIEAgdG8gdGhlIHNyYyBkaXJlY3RvcnlcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgfSxcblxuICAvLyBGaWxlIHR5cGVzIHRvIHN1cHBvcnQgcmF3IGltcG9ydHMuIE5ldmVyIGFkZCAuY3NzLCAudHN4LCBvciAudHMgZmlsZXMgdG8gdGhpcy5cbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLnN2ZycsICcqKi8qLmNzdiddLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsU0FBUyxvQkFBb0I7QUFDdFMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sV0FBVztBQUZsQixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBO0FBQUEsRUFHQSxlQUFlLENBQUMsWUFBWSxVQUFVO0FBQ3hDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
