import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const flowersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.flower.findMany()
  }),
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      imgUrl: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.flower.create({data: input})
    }),
  delete: publicProcedure
    .input(z.object({
      id: z.string()
    }))  
    .mutation(async ({input,ctx }) => {
      return ctx.prisma.flower.delete({
        where:{
          id: input.id
        }
      })
    })
});
