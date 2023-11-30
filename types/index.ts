export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};
