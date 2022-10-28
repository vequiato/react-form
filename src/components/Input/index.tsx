import React, { useEffect, useRef } from 'react';

import useFormContext from '../../hooks/useForm';
import { validateInput } from './helpers';
import { InputProps } from './types';

const Input = ({ validations = [], value, onChange: _, ...props }: InputProps) => {
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

  return <input {...props} defaultValue={value} onBlur={isValidInput} ref={inputRef} />;
};

const TypedInput = Input as ({ validations, value, ...props }: Omit<InputProps, 'onChange'>) => JSX.Element;

export type { InputProps };
export { TypedInput as Input };
