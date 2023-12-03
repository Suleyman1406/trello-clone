"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCardModal from "@/hooks/use-card-modal";
import React from "react";

const CardModal = () => {
  const { isOpen, onClose } = useCardModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>I am a modal</DialogContent>
    </Dialog>
  );
};

export default CardModal;
