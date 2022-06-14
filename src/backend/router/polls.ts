import { prisma } from "@db/client";
import * as z from "zod";
import { createRouter } from "@backend/context";

export const pollRouter = createRouter()
  .query("get-all", {
    async resolve() {
      const polls = await prisma.poll.findMany();
      return { polls };
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) return { message: "Unauthorized" };

      const poll = await prisma.poll.create({
        data: {
          question: input.question,
          ownerToken: ctx.token,
        },
      });

      return poll;
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const poll = await prisma.poll.findUnique({
        where: {
          id: input.id,
        },
      });

      return { ...poll, isOwner: ctx.token === poll?.ownerToken };
    },
  });
