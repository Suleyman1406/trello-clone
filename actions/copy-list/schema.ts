import { z } from "zod";

export const CopyListSchema = z.object({
  id: z.string(),
});
