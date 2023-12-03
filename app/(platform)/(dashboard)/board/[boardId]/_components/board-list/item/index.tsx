import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "../header";
import BoardListCardForm from "../card/form";
import { cn } from "@/lib/utils";
import BoardListCardItem from "../card/item";

interface IListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: IListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  const disableEditing = () => setIsEditing(false);

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.cards.length > 0 && "mt-2"
          )}
        >
          {data.cards.map((card, index) => (
            <BoardListCardItem index={index} key={card.id} data={card} />
          ))}
        </ol>
        <BoardListCardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
