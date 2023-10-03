import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { exerciseRouter } from "./routers/exercise";
import { movieRouter } from "./routers/movie";
import { letterRouter } from "./routers/letter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  exercise: exerciseRouter,
  movie: movieRouter,
  letter: letterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
