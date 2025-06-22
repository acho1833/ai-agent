import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { VideoIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
    meetingId: string;
}

const ProcessingState = ({meetingId}: Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState
                title="Meeting completed"
                description="This meeting was completed and a summary will appear soon"
                image="/processing.svg"
            />
        </div>
    );
};

export default ProcessingState;
