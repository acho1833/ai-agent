'use client';
import { AgentGetOne } from '@/modules/agents/types';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { agentsInsertSchema } from '@/modules/agents/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
};

const AgentForm = ({ initialValues, onSuccess, onCancel }: Props) => {
    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => {},
            onError: () => {},
        }),
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? '',
            instructions: initialValues?.instructions ?? '',
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            // Handle edit logic here
            // You can call a mutation to update the agent
        } else {
            createAgent.mutate(values, {
                onSuccess: async (data) => {
                    await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

                    if (initialValues?.id) {
                        await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }));
                    }

                    onSuccess?.();
                    // router.push(`/agents/${data.id}`);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch('name')}
                    variant="botttsNeutral"
                    className="border size-16"
                />
                <FormField
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Math tutor" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="name"
                    control={form.control}
                />
                <FormField
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="You are a helpful assistant that can answer questions and help with task."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name="instructions"
                    control={form.control}
                />
                <div className='flex justify-between gap-x-2'>
                    {onCancel && (
                        <Button
                            variant="ghost"
                            disabled={isPending}
                            type="button"
                            onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isPending}>
                        {isEdit ? 'Update' : 'Create'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AgentForm;
