"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { title, listId } = data;

  let card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
      include: {
        cards: {
          orderBy: {
            order: "desc",
          },
        },
      },
    });
    if (!list) {
      return {
        error: "List not found.",
      };
    }
    const newOrder = list.cards[0]?.order ? list.cards[0]?.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
      include: {
        list: {
          include: {
            board: true,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to create card.",
    };
  }
  revalidatePath(`/board/${card.list.boardId}`);
  return {
    data: card,
  };
};

export const createCard = createSafeAction(CreateCardSchema, handler);
