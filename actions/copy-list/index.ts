"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id } = data;

  let list;
  try {
    let copiedList = await db.list.findUnique({
      where: {
        id,
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
    if (!copiedList) {
      return {
        error: "List not found.",
      };
    }

    const newListOrder = copiedList.cards[0]?.order
      ? copiedList.cards[0]?.order + 1
      : 1;

    list = await db.list.create({
      data: {
        title: `${copiedList.title} - Copy`,
        boardId: copiedList.boardId,
        order: newListOrder,
        cards: {
          createMany: {
            data: copiedList.cards.map((card) => ({
              order: card.order,
              title: card.title,
              description: card.description,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy list.",
    };
  }
  revalidatePath(`/board/${list.boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyListSchema, handler);
