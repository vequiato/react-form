import { FormConfig } from './types';

let config: FormConfig = {
  options: {
    requestHeaders: { 'content-type': 'application/json' },
    method: 'POST',
    validateOnBlur: false,
  },
};

function setGlobalConfig({ options = {} }: FormConfig) {
  config = { options: { ...config.options, ...options } };
}

function getGlobalConfig() {
  return config;
}

export { setGlobalConfig, getGlobalConfig };
