import { createTRPCRouter } from "./trpc";
import { flowersRouter } from "./routers/flowers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  flowers: flowersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
