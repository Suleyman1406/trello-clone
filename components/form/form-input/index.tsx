"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "../form-errors";

interface IFormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            ref={ref}
            name={id}
            type={type}
            onBlur={onBlur}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`}
            className={cn("text-sm px-2 py-1 h-7", className)}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
