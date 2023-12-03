import { Card } from "@prisma/client";
import React from "react";

interface IBoardListCardItemProps {
  index: number;
  data: Card;
}
const BoardListCardItem = ({ data, index }: IBoardListCardItemProps) => {
  return (
    <div
      role={"button"}
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 bg-white text-sm rounded-md shadow-sm"
    >
      BoardListCardItem
    </div>
  );
};

export default BoardListCardItem;
