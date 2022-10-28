import React, { useEffect, useRef } from 'react';

import useFormContext from '../../hooks/useForm';
import { validateInput } from './helpers';
import { InputProps } from './types';

export const Input = ({ validations = [], ...props }: InputProps) => {
  const { formInputsRefs, validateOnBlur } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidInput = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validateOnBlur !== undefined && inputRef.current !== null) {
      validateInput(inputRef.current, validations);
    }

    props.onBlur?.(event);
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      formInputsRefs.current[formInputsRefs.current.length] = { input: inputRef.current, validations };
    }
  }, [formInputsRefs, validations]);

  return <input {...props} onBlur={isValidInput} ref={inputRef} />;
};

export type { InputProps };
export default Input;
