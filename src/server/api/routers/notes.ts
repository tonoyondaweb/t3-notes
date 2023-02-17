import { object, string } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      object({
        title: string()
          .min(1, { message: "Empty Title" })
          .max(200, { message: "Too long, must be less than 200 characters" })
          .trim(),
        text: string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.note.create({
          data: {
            userId: ctx.session.user.id,
            title: input.title,
            text: input.text,
          },
        });
      } catch (error) {
        console.log(`Note could not be created ${error as string}`);
      }
    }),
  readAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.note.findMany({
      select: {
        id: true,
        title: true,
        text: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  readNote: protectedProcedure
    .input(
      object({
        id: string().min(5, { message: "id not enough length" }),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.note.findUnique({
          select: {
            id: true,
            title: true,
            text: true,
          },
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(`Could not retrieve note ${error as string}`);
      }
    }),
  update: protectedProcedure
    .input(
      object({
        title: string()
          .min(1, { message: "Empty Title" })
          .max(200, { message: "Too long, must be less than 200 characters" })
          .trim(),
        text: string(),
        id: string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.note.update({
          data: {
            title: input.title,
            text: input.text,
          },
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(`Note could not be updated ${error as string}`);
      }
    }),
  delete: protectedProcedure
    .input(object({ id: string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.note.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(`Note could not be deleted ${error as string}`);
      }
    }),
});
