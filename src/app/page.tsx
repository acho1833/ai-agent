'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export default function Home() {
    const {
        data: session
    } = authClient.useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmit = () => {
        authClient.signUp.email(
            {
                email,
                password,
                name,
            },
            {
                onSuccess: () => {
                    console.log('User created successfully');
                    // Optionally redirect or show a success message
                },
                onError: (error) => {
                    console.error('Error creating user:', error);
                },
            },
        );
    };

        const onLogin = () => {
        authClient.signIn.email(
            {
                email,
                password,
            },
            {
                onSuccess: () => {
                    console.log('User created successfully');
                    // Optionally redirect or show a success message
                },
                onError: (error) => {
                    console.error('Error creating user:', error);
                },
            },
        );
    };

    if (session) {
        return (
            <div className="flex flex-col gap-y-4 p-4">
                <p>Welcome, {session.user.name}!</p>
                <p>Email: {session.user.email}</p>
                <Button onClick={() => authClient.signOut()}>Sign Out</Button>
            </div>
        );
    }


    return (
      <div className='flex flex-col gap-y-10'>

        <div className="flex flex-col gap-y-4 p-4">
            <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={onSubmit}>Create User</Button>
        </div>

                <div className="flex flex-col gap-y-4 p-4">
            <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={onLogin}>Login</Button>
        </div>

      </div>
    );
}
