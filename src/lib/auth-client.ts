import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  // Production e NEXT_PUBLIC_APP_URL theke URL asbe.
  // Na thakle empty thake, tokhon browser-er nijer origin (localhost:3000 ba onno port) use hobe.
  baseURL: process.env.NEXT_PUBLIC_APP_URL,

  // Server-er auth.ts er additionalFields (role, coverImage) client e type hisebe ene dey.
  // Ei jonno signUp.email({ role }) ar session.user.role TypeScript error dey na.
  plugins: [inferAdditionalFields<typeof auth>()],
})
