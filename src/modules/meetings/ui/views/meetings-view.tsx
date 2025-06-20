'use client';

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const MeetingsViewLoading = () => {
    return <LoadingState title="Loading Meeting" description="This may take few seconds" />;
};

export const MeetingsViewError = () => {
    return <ErrorState title="Error Loading Meeting" description="Something went wrong" />;
};

const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div>
            
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default MeetingsView;
