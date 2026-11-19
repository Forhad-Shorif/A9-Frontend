'use client'
import { authClient } from "@/lib/auth-client" // import the auth client

const ClientUser = () => {

    const { data: session, error } = authClient.useSession();
    const user = session?.user;

    return user;
};

export default ClientUser;