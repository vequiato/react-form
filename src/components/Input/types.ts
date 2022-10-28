export type InputProps = {
  [k in keyof React.InputHTMLAttributes<HTMLInputElement>]: React.InputHTMLAttributes<HTMLInputElement>[k];
} & {
  id: string;
  validations?: RegExp[] | Array<(value: string) => boolean>;
};
