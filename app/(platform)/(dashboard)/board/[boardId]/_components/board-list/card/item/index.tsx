import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";

interface IBoardListCardItemProps {
  index: number;
  data: Card;
}
const BoardListCardItem = ({ data, index }: IBoardListCardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role={"button"}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 bg-white text-sm rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default BoardListCardItem;
