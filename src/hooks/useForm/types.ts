export type FormField = {
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  validations?: RegExp[] | ((value: string) => boolean)[];
} & (
  | {
      type: "text" | "number" | "email";
    }
  | {
      type: "select";
      options: Record<string, any>[];
    }
);

export type FormFields = Record<string, FormField>;

export type ReturnKeyType<T> = T extends string ? T : never;
