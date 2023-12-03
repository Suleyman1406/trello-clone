import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface IListOptionsProps {
  onAddCard: () => void;
  data: List;
}
const ListOptions = ({ onAddCard, data }: IListOptionsProps) => {
  const closePopoverRef = useRef<ElementRef<"button">>(null);
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (list) => {
      toast.success(`List "${list.title}" copied!`);
      closePopoverRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (list) => {
      toast.success(`List "${list.title}" deleted!`);
      closePopoverRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onListDeleteFormSubmit = () => {
    const promise = executeDelete({ id: data.id });
    toast.promise(promise, {
      loading: "Delete list loading...",
    });
  };

  const onListCopyFormSubmit = () => {
    executeCopy({ id: data.id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 hover:bg-black/5" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            ref={closePopoverRef}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
          onClick={onAddCard}
        >
          Add card...
        </Button>
        <form action={onListCopyFormSubmit}>
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onListDeleteFormSubmit}>
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
