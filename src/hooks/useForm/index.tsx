import { useRef, useEffect } from "react";

import { ReturnKeyType, FormFields, FormField } from "./types";
import Form, { FormProps } from "../../components/Form";
import Input, { InputProps, ReturnedInput } from "../../components/Input";

export default function useForm<T extends FormFields>(fields: T) {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const fieldsKeys = Object.keys(fields);

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

  return {
    FormFields: formFields as Record<
      Capitalize<ReturnKeyType<keyof T>>,
      ReturnedInput
    >,
    Form: (props: Omit<FormProps, "inputsRef">) => (
      <Form {...props} inputsRef={inputsRef}>
        {props.children}
      </Form>
    ),
  };
}

export type { ReturnKeyType, FormFields, FormField };
