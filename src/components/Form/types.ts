import React from 'react';

import { InputComponentProps } from '../Input';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  inputsRef: React.MutableRefObject<HTMLInputElement[]>;
  inputsValidations: { [k: string]: InputComponentProps['validations'] };
  submitFormHandler: (body: Record<string, any>) => void;
};
