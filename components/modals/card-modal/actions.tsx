import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import useCardModal from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ICardModalActionsProps {
  data: CardWithList;
}

const CardModalActions = ({ data }: ICardModalActionsProps) => {
  const { onClose } = useCardModal();
  const { execute: executeCardCopy, isLoading: isCardCopyLoading } = useAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success(`Card "${data.title}" copied.`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeCardDelete, isLoading: isCardDeleteLoading } =
    useAction(deleteCard, {
      onSuccess: () => {
        toast.success(`Card "${data.title}" deleted.`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const onCopy = () => {
    executeCardCopy({ id: data.id });
  };
  const onDelete = () => {
    executeCardDelete({ id: data.id });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        variant={"gray"}
        disabled={isCardCopyLoading || isCardDeleteLoading}
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        variant={"gray"}
        onClick={onDelete}
        disabled={isCardDeleteLoading || isCardDeleteLoading}
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

CardModalActions.Skeleton = function CardModalActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
export default CardModalActions;
