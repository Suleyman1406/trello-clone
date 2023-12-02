"use client";

import { ListWithCards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "../form";
import ListItem from "../item";

interface IListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

const ListContainer = ({ data, boardId }: IListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, idx) => (
        <ListItem key={list.id} index={idx} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
