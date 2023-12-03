import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { KeyboardEventHandler, forwardRef } from "react";
import FormErrors from "../form-errors";
import { useFormStatus } from "react-dom";

interface IFormTextareaProps {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  defaultValue?: string;
}
const FormTextarea = forwardRef<HTMLTextAreaElement, IFormTextareaProps>(
  (
    {
      id,
      name,
      label,
      errors,
      onBlur,
      onClick,
      required,
      disabled,
      className,
      onKeyDown,
      placeholder,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label && (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            ref={ref}
            name={name}
            onBlur={onBlur}
            onClick={onClick}
            required={required}
            disabled={disabled || pending}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
