import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "desire-introspectible-monroe.ngrok-free.dev",
      "violet-groups-carry.loca.lt",
      "detail-legislature-boating-jesse.trycloudflare.com",
    ],
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // target: "https://desire-introspectible-monroe.ngrok-free.dev",
      },
    },
  },
});
