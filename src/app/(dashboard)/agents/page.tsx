import AgentsView, { AgentsViewLoading } from '@/modules/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorState from '@/components/error-state';

const Page = async () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <ErrorBoundary
                    fallback={
                        <ErrorState
                            title="Error Loading Agents"
                            description="Something weng wrong"
                        />
                    }
                >
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;
