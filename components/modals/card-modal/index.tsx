"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCardModal from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CardModalHeader from "./header";
import CardModalDescription from "./description";
import CardModalActions from "./actions";

const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal();
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="outline-none">
        {cardData ? (
          <CardModalHeader data={cardData} />
        ) : (
          <CardModalHeader.Skeleton />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <CardModalDescription data={cardData} />
              ) : (
                <CardModalDescription.Skeleton />
              )}
            </div>
          </div>
          {cardData ? (
            <CardModalActions data={cardData} />
          ) : (
            <CardModalActions.Skeleton />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
