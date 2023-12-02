"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { title, boardId } = data;

  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
      include: {
        lists: {
          orderBy: {
            order: "desc",
          },
        },
      },
    });
    if (!board) {
      return {
        error: "Board not found.",
      };
    }
    const newOrder = board.lists[0]?.order ? board.lists[0]?.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create list.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const createList = createSafeAction(CreateListSchema, handler);
