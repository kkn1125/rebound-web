import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const isDev = mode === "development";
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": {
        DEPLOY_URL: isDev
          ? "http://localhost:8080"
          : "https://kkn1125.github.io/rebound-web",
        BRAND: "rebound",
      },
    },
    base: isDev ? "/" : "/rebouned-web/",
    server: {
      host: "127.0.0.1",
      port: 5000,
    },
    plugins: [react(), viteTsconfigPaths()],
  };
});
