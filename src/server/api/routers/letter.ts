import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const letterRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.letter.findMany();
  }),

  createLetter: publicProcedure
    .input(
      z.object({
        senderName: z.string().optional(),
        recipientName: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.letter.create({
        data: {
          senderName: input.senderName,
          recipientName: input.recipientName,
        },
      });
    }),
});
