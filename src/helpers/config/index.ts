import { FlattenSimpleInterpolation } from 'styled-components';

import { initialConfig } from './initialConfigs';

export interface FormConfig {
  styles?: FlattenSimpleInterpolation;
  options?: {
    baseUrl?: string;
    requestHeaders?: HeadersInit;
    method?: 'POST' | 'PUT';
    validateOnBlur?: boolean;
  };
}

let config: FormConfig;

function setFormConfig({ styles, options }: FormConfig) {
  if (config === undefined) {
    throw new Error('You already setted form configuration');
  }

  config = { styles, options };
}

function getFormConfig() {
  return config ?? initialConfig;
}

export { setFormConfig, getFormConfig };
