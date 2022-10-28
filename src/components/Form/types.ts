import React from 'react';

import { InputProps } from '../Input';
import { FormConfig } from '../../config/types';
import { AsyncState } from '../../hooks/useAsync/types';

export type FormInputRefs = React.MutableRefObject<
  Array<{ input: HTMLInputElement; validations: InputProps['validations'] }>
>;

export interface FormChildrenProps {
  data: any;
  status: AsyncState['status'];
  error: AsyncState['error'];
}

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children'> & {
  children: ({ data, status, error }: FormChildrenProps) => JSX.Element;
  validateOnBlur?: boolean;
  path: string;
} & {
  [key in keyof FormConfig]?: FormConfig[key];
};
