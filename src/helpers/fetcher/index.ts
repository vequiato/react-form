import { FormConfig } from "../../helpers/config";

const fetcher = async (
  path: string,
  body: Record<string, any>,
  formOptions: NonNullable<FormConfig["options"]>
) => {
  const headers = formOptions.requestHeaders as { [k: string]: string };
  const headerValues = Object.keys(headers as {}).map(
    (header) => headers[header]
  );

  const bodyData = body as BodyInit;

  const response = await fetch(
    formOptions.baseUrl ? `${formOptions.baseUrl}/${path}` : path,
    {
      body: headerValues.includes("application/json")
        ? JSON.stringify(bodyData)
        : bodyData,
      method: formOptions.method,
      headers: { ...formOptions.requestHeaders },
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
};

export default fetcher;
