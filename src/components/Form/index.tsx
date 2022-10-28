import { useRef, useState } from 'react';

import { validateInput } from '../Input/helpers';
import { FormContext } from '../../hooks/useForm';
import useAsync from '../../hooks/useAsync';
import fetcher from './fetcher';
import { FormProps, FormInputRefs } from './types';

export const Form = ({ children, onSubmit, validateOnBlur, path, options, ...props }: FormProps) => {
  const formInputsRefs: FormInputRefs = useRef([]);
  const { data, error, status, run } = useAsync();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    formInputsRefs.current.forEach(({ input, validations }) => validateInput(input, validations));

    const invalidFields = formInputsRefs.current
      .filter(({ input }) => input.dataset.valid === 'false')
      .map((field) => field.input.id);

    if (invalidFields.length > 0) {
      setInvalidFields(invalidFields);

      return;
    }

    const formValues = formInputsRefs.current.reduce((previousInputs, currentInput) => {
      const { id, value } = currentInput.input;
      return {
        ...previousInputs,
        [id]: value,
      };
    }, {});

    if (onSubmit !== undefined) {
      onSubmit(formValues);
      return;
    }

    void run(fetcher(path, formValues, options));
  };

  return (
    <form {...props} onSubmit={submitFormHandler}>
      <FormContext.Provider value={{ formInputsRefs, validateOnBlur }}>
        {typeof children === 'function'
          ? children({ formState: { invalidFields }, promiseState: { response: data, status, error } })
          : children}
      </FormContext.Provider>
    </form>
  );
};

export type { FormProps };
export default Form;
