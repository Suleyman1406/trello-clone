import { createCard } from "@/actions/create-card";
import FormSubmit from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { error } from "console";
import { Plus, X } from "lucide-react";
import React, {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface IBoardListCardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

const BoardListCardForm = forwardRef<
  HTMLTextAreaElement,
  IBoardListCardFormProps
>(({ listId, isEditing, disableEditing, enableEditing }, ref) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" created!`);
      formRef.current?.reset();
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCardCreateSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, listId });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onCardCreateSubmit}
        className="m-1 py-0.5 px-1 space-y-4"
      >
        <FormTextarea
          id="title"
          name="title"
          ref={ref}
          onKeyDown={onTextAreaKeyDown}
          placeholder="Enter title for this card..."
          errors={fieldErrors}
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>Add a card</FormSubmit>
          <Button
            type="button"
            onClick={disableEditing}
            size="sm"
            variant="ghost"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div className="pt-2 px-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

BoardListCardForm.displayName = "BoardListCardForm";
export default BoardListCardForm;
