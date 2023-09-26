import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.exercise.findMany();
  }),

  createExercise: publicProcedure
    .input(z.object({ name: z.string(), duration: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.exercise.create({
        data: {
          name: input.name,
          duration: input.duration,
        },
      });
    }),
});
