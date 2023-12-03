import { z } from "zod";
import { UpdateListOrderSchema } from "./schema";
import { ActionState } from "@/types";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
