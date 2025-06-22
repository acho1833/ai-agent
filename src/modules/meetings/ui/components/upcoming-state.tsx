import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { BanIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';

const UpcomingState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState
                title="Not started yet"
                description="Once you start the meeting, a summary will appear here"
                image="/upcoming.svg"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
                <Button>
                    <BanIcon /> Cancel meeting
                </Button>
                <Button className='w-full lg:w-auto' asChild>                    
                    <Link href={`/call/${123}`}><VideoIcon />  Start meeting</Link>
                </Button>
            </div>
        </div>
    );
};

export default UpcomingState;
