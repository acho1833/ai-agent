import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://symmetrical-halibut-4jg7x54jvqpwc7x5g-3000.app.github.dev",
})