import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import useAsync from '../../hooks/useAsync';
import Form, { FormProps } from '../../components/Form';
import Input, { InputProps, ReturnedInput } from '../../components/Input';
import { ReturnKeyType, FormFields, FormField } from './types';
import { getFormConfig, FormConfig } from '../../helpers/config';
import fetcher from '../../helpers/fetcher';

export function useForm<T extends FormFields>(
  fields: T,
  path: string,
  { styles: customStyles, options: customOptions }: FormConfig = {},
) {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { data, error, status, run } = useAsync();
  const { styles: configStyles, options } = getFormConfig();
  const [formBody, setFormBody] = useState<Record<string, any>>();

  const fieldsKeys = Object.keys(fields);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, fieldsKeys.length);
  }, [fieldsKeys, inputsRef]);

  const formOptions = { ...options, ...customOptions };
  let inputsValidations = {};

  const formFields = fieldsKeys.reduce((acc, fieldId, idx) => {
    const { type, value, ...fieldProps } = fields[fieldId];

    if (type === 'text' || type === 'email' || type === 'number') {
      inputsValidations = {
        ...inputsValidations,
        [fieldId]: fieldProps.validations,
      };

      return {
        ...acc,
        [`${fieldId.charAt(0).toUpperCase()}${fieldId.slice(1)}`]: (props: Omit<InputProps, keyof InputProps>) => (
          <Input
            {...props}
            {...fieldProps}
            defaultValue={formBody?.[fieldId] ?? value}
            id={fieldId}
            key={fieldId}
            type={type}
            validateOnBlur={formOptions?.validateOnBlur}
            ref={(el: HTMLInputElement) => (inputsRef.current[idx] = el)}
          />
        ),
      };
    }

    if (type === 'select') {
      throw new Error('Sorry, need to implementation :(');
    }

    return acc;
  }, {});

  const StyledForm = styled(Form)`
    ${configStyles}
    ${customStyles}
  `;

  const submitFormHandler = (body: Record<string, any>) => {
    setFormBody(body);
    void run(fetcher(path, body, formOptions));
  };

  return {
    FormFields: formFields as Record<Capitalize<ReturnKeyType<keyof T>>, ReturnedInput>,
    Form: (props: Omit<FormProps, 'inputsRef' | 'inputsValidations' | 'submitFormHandler' | 'onSubmit'>) => (
      <StyledForm
        {...props}
        inputsRef={inputsRef}
        inputsValidations={inputsValidations}
        submitFormHandler={submitFormHandler}
      >
        {props.children}
      </StyledForm>
    ),
    data: {
      error,
      status,
      response: data,
    },
  };
}

export type { FormFields, FormField };
export default useForm;
