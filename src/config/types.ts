export interface FormConfig {
  options: {
    baseUrl?: string;
    requestHeaders?: HeadersInit;
    method?: 'POST' | 'PUT';
    validateOnBlur?: boolean;
  };
}
