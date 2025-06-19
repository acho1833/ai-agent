import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://reimagined-guacamole-wr97wp6r5r97396vx-3000.app.github.dev",
})