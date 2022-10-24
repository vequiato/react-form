import React, { useState } from "react";

import { InputProps, InputComponentProps, ReturnedInput } from "./types";

type InnerProps = InputProps & InputComponentProps;

const validateInput = (
  value: string,
  validations: InnerProps["validations"]
) => {
  let isValid: boolean = false;

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

  return isValid;
};

export const Input = React.forwardRef(
  ({ id, label, validations, ...props }: InnerProps, ref) => {
    const [isValid, setIsValid] = useState(() =>
      validateInput(String(props.value) || "", validations)
    );

    const isValidInput = (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setIsValid(validateInput(value, validations));
      props.onBlur?.(event);
    };

    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}

        <input
          {...props}
          id={id}
          data-valid={isValid}
          onBlur={isValidInput}
          ref={ref as React.LegacyRef<HTMLInputElement>}
        />
      </>
    );
  }
);

export type { InputProps, InputComponentProps, ReturnedInput };
export default Input;
