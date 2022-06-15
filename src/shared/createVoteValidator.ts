import * as z from "zod";

const createVoteValidator = z.object({
  pollId: z.string(),
  choice: z.number().min(0).max(9),
});

const createVoteFieldValue = z.object({
  choice: z.string().max(1),
});

export type createVoteFieldType = z.infer<typeof createVoteFieldValue>;

export { createVoteValidator, createVoteFieldValue };
