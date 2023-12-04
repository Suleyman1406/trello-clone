import { MAX_FREE_BOARDS } from "@/constants/boards";
import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const increaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized.");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: { increment: 1 },
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized.");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvaliableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized.");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  return !orgLimit || orgLimit.count < MAX_FREE_BOARDS;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  return MAX_FREE_BOARDS - (orgLimit?.count ?? 0);
};
