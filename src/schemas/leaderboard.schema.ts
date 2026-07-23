import { z } from "zod";

export const createScoreSchema = z.object({
  score: z.number().int().min(0, "Score muss mindestens 0 sein."),
});

export type createScoreInput = z.infer<typeof createScoreSchema>;
