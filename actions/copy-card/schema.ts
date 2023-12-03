import { z } from "zod";

export const CopyCardSchema = z.object({
  id: z.string(),
});
