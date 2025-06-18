import { getQueryClient, trpc } from '@/trpc/server';
import React, { Suspense } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { ErrorBoundary } from 'react-error-boundary';
import AgentIdView, { AgentIdViewError, AgentIdViewLoading } from '@/modules/agents/ui/views/agent-id-view';

type Props = {
    params: Promise<{ agentId: string }>;
};

const Page = async ({ params }: Props) => {
    const { agentId } = await params;
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLoading />}>
                <ErrorBoundary fallback={<AgentIdViewError />}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;
