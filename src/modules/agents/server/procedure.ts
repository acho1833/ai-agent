import { db } from '@/db';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { agents } from '@/db/schema';
import { TRPCError } from '@trpc/server';

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
        // throw new TRPCError({
        //     code: 'BAD_REQUEST'
        // });
        return db.select().from(agents);
    }),
});
