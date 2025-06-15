import { db } from '@/db';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agents } from '@/db/schema';
import { agentsInsertSchema } from '@/modules/agents/schema';
import z from 'zod';
import { eq } from 'drizzle-orm';

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const [existingAgent] = await db
                .select({
                    name: agents.name,
                    instructions: agents.instructions,
                    id: agents.id,
                })
                .from(agents)
                .where(eq(agents.id, input.id));

            return existingAgent;
        }),
    getMany: protectedProcedure.query(async () => {
        // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
        // throw new TRPCError({
        //     code: 'BAD_REQUEST'
        // });
        return db.select().from(agents);
    }),
    create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id, // Assuming ctx.auth contains the userId
            })
            .returning();

        return createdAgent;
    }),
});
