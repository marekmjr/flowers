import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const flowersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.flower.findMany()
  }),
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      howOftenToWaterInDays: z.number(),
      dateOfLastWatering: z.date()
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
    }),
  updateCoordinates: publicProcedure
    .input(z.object({
      id: z.string(),
      coordinateX: z.number(),
      coordinateY: z.number()
    }))  
    .mutation(async ({input,ctx }) => {
      return ctx.prisma.flower.update({ 
        where:{
          id: input.id
        },
        data:{
          coordinateX: input.coordinateX,
          coordinateY: input.coordinateY
        }
      })
    }),
  water: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async ({input,ctx }) => {
      return ctx.prisma.flower.update({ 
        where:{
          id: input.id,
        },
        data:{
          dateOfLastWatering: new Date()
        }
      })
    }),
});
