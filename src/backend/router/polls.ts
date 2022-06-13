import * as trpc from "@trpc/server";
import { prisma } from "@db/client";
import * as z from "zod";

export const pollRouter = trpc
  .router()
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
    async resolve({ input }) {
      const poll = await prisma.poll.create({
        data: {
          question: input.question,
        },
      });

      return poll;
    },
  });
