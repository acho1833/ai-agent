'use client';
import React from 'react';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import LoadingState from '@/components/loading-state';
import { columns } from '@/modules/agents/ui/components/columns';
import EmptyState from '@/components/empty-state';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import DataPagination from '@/components/data-pagination';

export const AgentsViewLoading = () => {
    return <LoadingState title="Loading Agents" description="This may take few seconds" />;
};

const AgentsView = () => {
    const router = useRouter();
    const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({ ...filters }));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
            <DataTable
                columns={columns}
                data={data.items}
                onRowClick={(row) => router.push(`/agents/${row.id}`)}
            />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
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
