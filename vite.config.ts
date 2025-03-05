import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host: "127.0.0.1",
      port: 5000,
    },
    plugins: [react(), viteTsconfigPaths()],
  };
});
