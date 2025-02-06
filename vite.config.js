import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [import.meta.VITE_ALLOWED_HOSTS],
        port: import.meta.VITE_PORT,
    },
});
