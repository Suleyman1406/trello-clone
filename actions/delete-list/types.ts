import { z } from "zod";
import { DeleteListSchema } from "./schema";
import { ActionState } from "@/types";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
