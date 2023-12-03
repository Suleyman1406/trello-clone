import { z } from "zod";
import { CopyCardSchema } from "./schema";
import { ActionState } from "@/types";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
