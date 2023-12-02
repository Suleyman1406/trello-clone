import { ListWithCards } from "@/types";
import React from "react";
import ListHeader from "../header";

interface IListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: IListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
