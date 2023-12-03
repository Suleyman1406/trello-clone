"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id } = data;

  let card;
  try {
    const copiedCard = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!copiedCard) {
      return {
        error: "Card not found.",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: copiedCard.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: copiedCard.title + " - Copy",
        order: newOrder,
        listId: copiedCard.listId,
        description: copiedCard.description,
      },
      include: {
        list: true,
      },
    });
    await createAuditLog({
      action: ACTION.CREATE,
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return {
      error: "Failed to copy card.",
    };
  }
  revalidatePath(`/board/${card.list.boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
