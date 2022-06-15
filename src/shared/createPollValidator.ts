import * as z from "zod";

const createPollValidator = z.object({
  question: z.string().min(5),
  options: z
    .array(z.object({ content: z.string().min(5).max(1000) }))
    .min(2)
    .max(10),
});

export type createPollType = z.infer<typeof createPollValidator>;

export default createPollValidator;
