import { FormProps } from "./types";

import { InputComponentProps } from "../Input";

const validateInput = (input: HTMLInputElement) => {
  let isValid: boolean = false;
  const { value } = input;

  const validations: InputComponentProps["validations"] = JSON.parse(
    input.dataset.validations || "[]"
  ).map((validation: string) => eval(validation));

  if (!validations || validations.length === 0) {
    isValid = true;
  } else {
    validations.forEach((validation) => {
      if (typeof validation === "function") {
        isValid = validation(value);
      } else {
        isValid = validation.test(value);
      }
    });
  }

  input.dataset.valid = String(isValid);
};

const Form = ({ children, inputsRef, ...props }: FormProps) => {
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    inputsRef.current.forEach((input) => validateInput(input));

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
      {children} <button type="submit">enviar</button>
    </form>
  );
};

export type { FormProps };
export default Form;
