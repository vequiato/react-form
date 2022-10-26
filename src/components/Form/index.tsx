import { FormProps } from "./types";

const validateInput = (
  input: HTMLInputElement,
  inputsValidations: FormProps["inputsValidations"]
) => {
  let isValid: boolean = false;
  const { value, id } = input;

  const validations = inputsValidations[id];

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

const Form = ({
  children,
  inputsRef,
  inputsValidations,
  submitFormHandler: submitForm,
  ...props
}: FormProps) => {
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    inputsRef.current.forEach((input) =>
      validateInput(input, inputsValidations)
    );

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

    submitForm(formValues as Record<string, any>);
  };

  return (
    <form {...props} onSubmit={submitFormHandler}>
      {children}
    </form>
  );
};

export type { FormProps };
export default Form;
