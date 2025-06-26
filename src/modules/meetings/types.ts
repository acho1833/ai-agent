import type { AppRouter } from '@/trpc/routers/_app';
import { inferRouterOutputs } from '@trpc/server';

export type MeetingGetMany = inferRouterOutputs<AppRouter>['meetings']['getMany']['items'];
export type MeetingGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne'];
export enum MeetingStatus {
    Upcoming = 'upcoming',
    Active = 'active',
    Completed = 'completed',
    Cancelled = 'cancelled',
    Processing = 'processing',
}
export type StreamTranscriptItem = {
    speaker_id: string;
    type: string;
    text: string;
    start_ts: number;
    stop_ts: number;
}