import React, { ElementRef, useRef, useState } from "react";
import { List } from "@prisma/client";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

import FormInput from "@/components/form/form-input";
import { updateList } from "@/actions/update-list";
import { useAction } from "@/hooks/use-action";
import ListOptions from "../options";

interface IListHeaderProps {
  data: List;
  onAddCard: () => void;
}
const ListHeader = ({ data, onAddCard }: IListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => setIsEditing(false);

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      setTitle(data.title);
      toast.success(`List renamed to "${data.title}"!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) {
      return disableEditing();
    }
    console.log(execute);

    execute({ title, listId: data.id });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1 px-0.5">
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            errors={fieldErrors}
            placeholder="Enter list title.."
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};

export default ListHeader;
