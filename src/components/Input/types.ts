import { FormField } from "../../hooks/useForm/types";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  Extract<keyof FormField, "id" | "options" | "type">
>;

export interface InputComponentProps {
  id: string;
  label?: string;
  validations?: RegExp[] | ((value: string) => boolean)[];
}

export type ReturnedInput = (
  props: Omit<InputProps, keyof FormField | keyof InputComponentProps>
) => JSX.Element;
