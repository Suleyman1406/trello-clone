import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ListContainer from "./_components/board-list/container";

interface IBoardIdPageProps {
  params: {
    boardId: string;
  };
}
const BoardIdPage = async ({ params }: IBoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }
  const { boardId } = params;

  const lists = await db.list.findMany({
    where: {
      boardId: boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
