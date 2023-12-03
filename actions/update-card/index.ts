"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id, ...values } = data;

  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
      include: {
        list: true,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update card.",
    };
  }
  revalidatePath(`/board/${card.list.boardId}`);
  return {
    data: card,
  };
};

export const updateCard = createSafeAction(UpdateCardSchema, handler);
