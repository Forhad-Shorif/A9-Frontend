"use client";

import { authClient } from "@/lib/auth-client";

const ClientUser = () => {
  const { data: session } = authClient.useSession();
  return session?.user ?? null;
};

export default ClientUser;