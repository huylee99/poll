import { prisma } from "@db/client";
import * as z from "zod";
import { createRouter } from "@backend/context";
import createPollValidator from "src/shared/createPollValidator";

export const pollRouter = createRouter()
  .query("get-all", {
    async resolve() {
      const polls = await prisma.poll.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return { polls };
    },
  })
  .mutation("create", {
    input: createPollValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) return { message: "Unauthorized" };

      const poll = await prisma.poll.create({
        data: {
          question: input.question,
          ownerToken: ctx.token,
          options: input.options,
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
      const poll = await prisma.poll.findFirst({
        where: {
          id: input.id,
        },
      });

      const myVote = await prisma.vote.findFirst({
        where: {
          pollId: input.id,
          voterToken: ctx.token,
        },
      });

      return { ...poll, isOwner: ctx.token === poll?.ownerToken, isVoted: !!myVote, myVote };
    },
  })
  .query("get-votes", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const votes = await prisma.vote.groupBy({
        by: ["choice"],
        where: {
          pollId: input.id,
        },
        _count: true,
      });

      const poll = await prisma.poll.findFirst({
        where: {
          id: input.id,
        },
      });

      return { poll, votes };
    },
  });
