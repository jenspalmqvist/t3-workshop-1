import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany({
      include: {
        actor: true,
        filmedInCountry: true,
      },
    });
  }),
});
