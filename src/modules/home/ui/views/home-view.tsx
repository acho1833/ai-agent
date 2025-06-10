'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const HomeView = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    if (!session) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p className='hover:text-blue-300'>Logged in as {session.user.name}</p>
            <Button onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/sign-in');
                    }
                }
            })}>Sign Out</Button>
        </div>
    );
};

export default HomeView;
