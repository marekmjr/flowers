import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { Flower } from '@prisma/client'


export const flowersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.flower.findMany()
  }),
  create: publicProcedure
  .input(z.object({
    name: z.string(),
    imgUrl: z.string(),
    description: z.string(),
    currHydration: z.number()
  }))
  .query(({ input, ctx }) => {
    ctx.prisma.flower.create({data: input})
  }),
});
