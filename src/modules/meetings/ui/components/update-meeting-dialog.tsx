import React from 'react';
import ResponsiveDialog from '@/components/responsive-dialog';
import MeetingForm from './meeting-form';
import { useRouter } from 'next/navigation';
import { MeetingGetOne } from '../../types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingGetOne;
};

const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: Props) => {
    const router = useRouter();
    return (
        <ResponsiveDialog
            title="Edit Meeting"
            description="Edit the details of your meeting"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm
                onSuccess={(id) => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};

export default UpdateMeetingDialog;
