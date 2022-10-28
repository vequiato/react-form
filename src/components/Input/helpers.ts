import { InputProps } from './types';

export const validateInput = (input: HTMLInputElement, validations: InputProps['validations']) => {
  let isValid: boolean = false;
  const { value } = input;

  if (validations == null || validations.length === 0) {
    isValid = true;
  } else {
    validations.forEach((validation) => {
      if (typeof validation === 'function') {
        isValid = validation(value);
      } else {
        isValid = validation.test(value);
      }
    });
  }

  input.dataset.valid = String(isValid);
};
