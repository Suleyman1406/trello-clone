"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrderSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { items } = data;

  let cards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
        include: {
          list: true,
        },
      })
    );
    cards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to update list order.",
    };
  }
  revalidatePath(`/board/${cards[0].list.boardId}`);
  return {
    data: cards,
  };
};

export const updateCardOrder = createSafeAction(UpdateCardOrderSchema, handler);
