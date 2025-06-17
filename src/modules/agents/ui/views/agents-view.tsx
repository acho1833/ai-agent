'use client';
import React from 'react';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import LoadingState from '@/components/loading-state';
import { DataTable } from '@/modules/agents/ui/components/data-table';
import { columns } from '@/modules/agents/ui/components/columns';
import EmptyState from '@/components/empty-state';

export const AgentsViewLoading = () => {
    return <LoadingState title="Loading Agents" description="This may take few seconds" />;
};

const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({}));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
            <DataTable columns={columns} data={data.items} />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
                />
            )}
            {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </div>
    );
};

export default AgentsView;
