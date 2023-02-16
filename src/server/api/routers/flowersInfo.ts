import { createTRPCRouter, publicProcedure } from "../trpc";


export const flowersInfoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.flowerDatabase.findMany({
      distinct: ['latin'],
    })
  }),
});
