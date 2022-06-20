import * as z from "zod";

const createPollValidator = z.object({
  question: z.string().min(5),
  options: z
    .array(z.object({ content: z.string().min(1).max(1000) }))
    .min(2)
    .max(10),
  endAt: z.string().refine(date => {
    if (date) {
      return new Date(date) > new Date(Date.now());
    }

    return true;
  }, "The date must be before today"),
});

export type createPollType = z.infer<typeof createPollValidator>;

export default createPollValidator;
