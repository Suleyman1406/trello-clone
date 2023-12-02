"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { title, listId } = data;

  let list;
  try {
    list = await db.list.update({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update list.",
    };
  }
  revalidatePath(`/board/${list.boardId}`);
  return {
    data: list,
  };
};

export const updateList = createSafeAction(UpdateListSchema, handler);
