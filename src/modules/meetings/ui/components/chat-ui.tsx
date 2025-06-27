import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { Channel as StreamChannel } from 'stream-chat';
import 'stream-chat-react/dist/css/v2/index.css';
import { Chat, useCreateChatClient, Channel, Window, MessageList, MessageInput, Thread } from 'stream-chat-react'; // or correct path if custom hook
import LoadingState from '@/components/loading-state';

type Props = {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string | null | undefined;
};

const ChatUI = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
    const trpc = useTRPC();
    const { mutateAsync: generateChatToken } = useMutation(
        trpc.meetings.generateChatToken.mutationOptions(),
    );
    const [channel, setChannel] = useState<StreamChannel>();
    const client = useCreateChatClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
        tokenOrProvider: generateChatToken,
        userData: {
            id: userId,
            name: userName,
            image: userImage ?? undefined, // Ensure image is optional
        },
    });
    useEffect(() => {
        if (!client) return;

        const channel = client.channel('messaging', meetingId, {
            members: [userId],
        });

        setChannel(channel);
    }, [client, meetingId, userId, meetingName]);

    if (!client) {
        return (
            <LoadingState
                title="Loading chat..."
                description="Please wait while we load the chat."
            />
        );
    }

    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <Chat client={client}>
                <Channel channel={channel}>
                    <Window>
                        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
                            <MessageList />
                            <MessageInput />
                        </div>
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    );
};

export default ChatUI;
