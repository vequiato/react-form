import { FlattenSimpleInterpolation } from "styled-components";

import { initialConfig } from "./initialConfigs";

export type FormConfig = {
  styles?: FlattenSimpleInterpolation;
  options?: {
    baseUrl?: string;
    requestHeaders?: HeadersInit;
    method?: "POST" | "PUT";
    validateOnBlur?: boolean;
  };
};

let config: FormConfig;

function setFormConfig({ styles, options }: FormConfig) {
  if (config) {
    throw new Error("You already setted form configuration");
  }

  config = { styles, options };
}

function getFormConfig() {
  return config || initialConfig;
}

export { setFormConfig, getFormConfig };
