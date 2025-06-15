'use client';
import React from 'react';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import LoadingState from '@/components/loading-state';

export const AgentsViewLoading = () => {
    return <LoadingState title="Loading Agents" description="This may take few seconds" />;
};

const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default AgentsView;
