import { useRef, useEffect } from "react";
import styled from "styled-components";

import Form, { FormProps } from "../../components/Form";
import Input, { InputProps, ReturnedInput } from "../../components/Input";
import { ReturnKeyType, FormFields, FormField } from "./types";
import { getFormConfig, FormConfig } from "../../helpers/config";

export function useForm<T extends FormFields>(
  fields: T,
  { styles: customStyles, options: customOptions }: FormConfig = {}
) {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const fieldsKeys = Object.keys(fields);
  const { styles: configStyles, options } = getFormConfig();

  const formOptions = { ...options, ...customOptions };

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, fieldsKeys.length);
  }, [fieldsKeys, inputsRef]);

  const formFields = fieldsKeys.reduce((acc, fieldId, idx) => {
    const { type, ...fieldProps } = fields[fieldId];

    if (type === "text" || type === "email" || type === "number") {
      return {
        ...acc,
        [`${fieldId.charAt(0).toUpperCase()}${fieldId.slice(1)}`]: (
          props: Omit<InputProps, keyof InputProps>
        ) => (
          <Input
            {...props}
            {...fieldProps}
            id={fieldId}
            key={fieldId}
            type={type}
            validateOnBlur={formOptions?.validateOnBlur}
            ref={(el: HTMLInputElement) => (inputsRef.current[idx] = el)}
          />
        ),
      };
    }

    if (type === "select") {
      throw new Error("Sorry, need to implementation :(");
    }

    return acc;
  }, {});

  const StyledForm = styled(Form)`
    ${configStyles}
    ${customStyles}
  `;

  return {
    FormFields: formFields as Record<
      Capitalize<ReturnKeyType<keyof T>>,
      ReturnedInput
    >,
    Form: (props: Omit<FormProps, "inputsRef">) => (
      <StyledForm {...props} inputsRef={inputsRef}>
        {props.children}
      </StyledForm>
    ),
  };
}

export type { FormFields, FormField };
export default useForm;
