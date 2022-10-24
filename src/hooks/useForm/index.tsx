import { useRef, useEffect } from "react";
import styled from "styled-components";
import { useAtomValue } from "jotai";

import Form, { FormProps } from "../../components/Form";
import Input, { InputProps, ReturnedInput } from "../../components/Input";
import { formConfigAtom, FormConfig } from "../useConfig";
import { ReturnKeyType, FormFields, FormField } from "./types";
import { initialConfig } from "./initialConfigs";

export function useForm<T extends FormFields>(
  fields: T,
  { styles: customStyles }: FormConfig = {}
) {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const fieldsKeys = Object.keys(fields);
  const { styles: configStyles } =
    useAtomValue(formConfigAtom) || initialConfig;

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, fieldsKeys.length);
  }, [fieldsKeys, inputsRef]);

  const formFields = fieldsKeys.reduce((acc, curr, i) => {
    const element = fields[curr];

    if (element.type === "text") {
      return {
        ...acc,
        [`${curr.charAt(0).toUpperCase()}${curr.slice(1)}`]: (
          props: Omit<InputProps, keyof InputProps>
        ) => (
          <Input
            {...props}
            id={curr}
            key={curr}
            label={element.label}
            name={element.name}
            defaultValue={element.value}
            placeholder={element.placeholder}
            validations={element.validations}
            ref={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
          />
        ),
      };
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
        <button>oi</button>
      </StyledForm>
    ),
  };
}

export type { ReturnKeyType, FormFields, FormField };
export default useForm;
