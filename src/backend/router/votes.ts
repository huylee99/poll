import { prisma } from "@db/client";
import { createRouter } from "@backend/context";
import { createVoteValidator } from "@shared/createVoteValidator";

export const voteRouter = createRouter().mutation("create", {
  input: createVoteValidator,
  async resolve({ input, ctx }) {
    if (!ctx.token) throw new Error("Unauthorized");

    const vote = await prisma.vote.create({
      data: {
        choice: input.choice,
        pollId: input.pollId,
        voterToken: ctx.token,
      },
    });

    return vote;
  },
});
