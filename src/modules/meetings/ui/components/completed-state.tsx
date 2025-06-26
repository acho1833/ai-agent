import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataTagErrorSymbol } from '@tanstack/react-query';
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparklesIcon } from 'lucide-react';
import { MeetingGetOne } from '../../types';
import Link from 'next/link';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { formatDuration } from '@/lib/utils';
import Markdown from 'react-markdown';

type Props = {
    data: MeetingGetOne;
};

const CompletedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-y-4">
            <Tabs defaultValue="summary">
                <div className="bg-white rounded-lg border px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-12">
                            <TabsTrigger
                                value="summary"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <BookOpenTextIcon /> Summary
                            </TabsTrigger>
                            <TabsTrigger
                                value="transcript"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <FileTextIcon /> Transcript
                            </TabsTrigger>
                            <TabsTrigger
                                value="recording"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <FileVideoIcon /> Recording
                            </TabsTrigger>
                            <TabsTrigger
                                value="chat"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <SparklesIcon /> Ask A
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <TabsContent value="recording">
                    <div className="bg-white rounded-lg border px-4 py-5">
                        <video src={data.recordingUrl!} controls className="w-full rounded-lg" />
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="bg-white rounded-lg border">
                        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                            <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
                            <div className="flex gap-x-2 items-center">
                                <Link
                                    href={`/agents/${data.agent.id}`}
                                    className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                                >
                                    <GeneratedAvatar
                                        seed={data.agent.name}
                                        variant="botttsNeutral"
                                        className="size-5"
                                    />
                                    {data.agent.name}
                                </Link>{' '}
                                <p>{data.startedAt ? format(data.startedAt, 'PPP') : ''}</p>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <SparklesIcon className='size-4'/>
                                <p>General Summary</p>
                            </div>
                            <Badge variant='outline' className='flex items-center gap-x-2 [&>svg]:size-4'>
                                <ClockFadingIcon className='text-blue-700'/>
                                {data.duration ? formatDuration(data.duration) : 'No duration'}
                            </Badge>
                            <div>
                                <Markdown components={{
                                    h1: ({ node, ...props }) => <h1 className="text-2xl font-medium mb-6" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-xl font-medium mb-6" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-lg font-medium mb-6" {...props} />,
                                    h4: ({ node, ...props }) => <h4 className="text-base font-medium mb-6" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-6 leading-relaxed" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-6" {...props} />,
                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                                    code: ({ node, ...props }) => <code className="bg-gray-100 p-1 rounded" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-6" {...props} />,
                                }}>
                                    {data.summary || 'No summary available.'}
                                </Markdown>
                            </div>
                        </div>

                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CompletedState;
