"use client";

import { ListWithCards } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import ListForm from "../form";
import ListItem from "../item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";
interface IListContainerProps {
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ data }: IListContainerProps) => {
  const { execute: executeListReOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeCardReOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = useCallback(
    (result: any) => {
      const { destination, source, type } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // on list order change
      if (type === "list") {
        const items = reorder(orderedData, source.index, destination.index).map(
          (item, index) => ({ ...item, order: index })
        );
        setOrderedData(items);

        const result = executeListReOrder({ items });
        toast.promise(result, {
          loading: "List reorder loading...",
        });
      }

      // on card order change
      if (type === "card") {
        const newOrderedData = [...orderedData];

        const destinationList = newOrderedData.find(
          (list) => list.id === destination.droppableId
        );
        const sourceList = newOrderedData.find(
          (list) => list.id === source.droppableId
        );

        if (!destinationList || !sourceList) {
          return;
        }

        // change only order of cart when destination list equals to source list
        if (destination.droppableId === source.droppableId) {
          const orderedCards = reorder(
            sourceList.cards,
            source.index,
            destination.index
          ).map((card, idx) => ({ ...card, order: idx }));

          sourceList.cards = orderedCards;
          const result = executeCardReOrder({ items: orderedCards });
          toast.promise(result, {
            loading: "Card reorder loading...",
          });
        } else {
          const [movedCard] = sourceList.cards.splice(source.index, 1);

          movedCard.listId = destinationList.id;
          destinationList.cards.splice(destination.index, 0, movedCard);

          sourceList.cards.forEach((card, idx) => (card.order = idx));
          destinationList.cards.forEach((card, idx) => (card.order = idx));

          const result = executeCardReOrder({
            items: [...sourceList.cards, ...destinationList.cards],
          });
          toast.promise(result, {
            loading: "Card reorder loading...",
          });
        }
        setOrderedData(newOrderedData);
      }
    },
    [orderedData, executeListReOrder, executeCardReOrder]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, idx) => (
              <ListItem key={list.id} index={idx} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
