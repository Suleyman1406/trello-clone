"use client";

import { ActionState, FieldErrors } from "@/types";
import { useCallback, useState } from "react";

export type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface IUseActionProps<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: IUseActionProps<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput>>();
  const [error, setError] = useState<string>();
  const [data, setData] = useState<TOutput>();
  const [isLoading, setLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      setLoading(true);

      const result = await action(input);

      if (!result) {
        return;
      }

      setFieldErrors(result.fieldErrors);

      if (result.error) {
        setError(result.error);
        options.onError?.(result.error);
      }

      if (result.data) {
        setData(result.data);
        options.onSuccess?.(result.data);
      }

      setLoading(false);
      options.onComplete?.();
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
