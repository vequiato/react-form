import React from 'react';

import { InputProps } from '../Input';
import { FormConfig } from '../../config/types';
import { AsyncState } from '../../hooks/useAsync/types';

export type FormInputRefs = React.MutableRefObject<
  Array<{ input: HTMLInputElement; validations: InputProps['validations'] }>
>;

export interface FormChildrenProps {
  promiseState: {
    response: any;
    status: AsyncState['status'];
    error: AsyncState['error'];
  };
  formState?: {
    invalidFields: string[];
  };
}

export type FormProps =
  | (Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> & {
      children: (promiseState: FormChildrenProps) => JSX.Element;
      onSubmit?: undefined;
      validateOnBlur?: boolean;
      path: string;
    } & {
      [key in keyof FormConfig]?: FormConfig[key];
    })
  | ({
      children: JSX.Element;
      onSubmit: (formValues: Record<string, any>) => void;
      validateOnBlur?: boolean;
      path: string;
    } & {
      [key in keyof FormConfig]?: FormConfig[key];
    });
