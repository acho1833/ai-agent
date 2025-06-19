import React from 'react';
import ResponsiveDialog from '@/components/responsive-dialog';
import AgentForm from '@/modules/agents/ui/components/agent-form';
import { AgentGetOne } from '../../types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
};

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: Props) => {
    return (
        <ResponsiveDialog
            title="New Agent"
            description="Edit a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};

export default UpdateAgentDialog;
