"use client";
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import React from "react";
import ListForm from "../form";

interface IListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

const ListContainer = ({ data, boardId }: IListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
