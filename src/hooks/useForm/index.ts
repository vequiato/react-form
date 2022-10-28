import { createContext, useContext } from 'react';

import { FormInputRefs, FormProps } from '../../components/Form/types';

interface FormContextProps {
  formInputsRefs: FormInputRefs;
  validateOnBlur?: FormProps['validateOnBlur'];
}

export const FormContext = createContext<FormContextProps | null>(null);

export default function useForm() {
  const context = useContext(FormContext);

  if (context === null) {
    throw new Error('useForm must be used within FormContext');
  }

  return context;
}
