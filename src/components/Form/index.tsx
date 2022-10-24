import { FormProps } from "./types";

export const Form = ({ children, inputsRef, ...props }: FormProps) => {
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allFieldsAreValid = inputsRef.current.every(
      (input) => input.dataset.valid === "true"
    );

    if (!allFieldsAreValid) {
      return;
    }

    const formValues = inputsRef.current.reduce((acc, curr) => {
      const { id, value } = curr;
      return {
        ...acc,
        [id]: value,
      };
    }, {});

    props.onSubmit?.(event);
  };

  return (
    <form {...props} onSubmit={submitFormHandler}>
      {children}
    </form>
  );
};

export type { FormProps };
export default Form;
