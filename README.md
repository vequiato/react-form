# react-amazing-form

An awesome form with stateless `Inputs` for your React application.
We don't need to rerender on every single letter inputed!

## Installation

```
# Yarn
yarn add react-amazing-form

# NPM
npm install react-amazing-form
```

## Usage

```jsx
import useForm from "./hooks/useForm";

function App() {
  const {
    FormFields,
    Form,
    data: { status, error },
  } = useForm(
    {
      email: {
        name: "email",
        placeholder: "",
        label: "E-mail",
        type: "email",
        value: "",
        validations: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
      },
      name: {
        name: "name",
        placeholder: "",
        type: "text",
        label: "Name",
        value: "",
        validations: [
          (value: string) => {
            return value.length >= 3;
          },
        ],
      },
    },
    "https://myapi.com/post-data-url"
  );

  return (
    <div className="App">
      <Form>
        <FormFields.Name />

        <FormFields.Email />

        {error && error.message}

        <button type="submit" disabled={status === "loading"}>
          Send
        </button>
      </Form>
    </div>
  );
}
```

In the example above, the request's `body` would be:

```jsx
{
  'name': 'value',
  'email': 'value'
}
```

#### `useForm(fields, path, options?)` params

```jsx
type fields = {
  [fieldId: string]: /* This key will be the input id */ {
    name?: string, // The name of input
    placeholder?: string, // The placeholder of input
    label?: string, // The label of input
    value?: string, // The initial value of input
    validations?: RegExp[] | ((value: string) => boolean)[], // The validations of input
  } & (
    | {
        type: "text" | "number" | "email", // Input type
      }
    | {
        type: "select", // Not implemented yet! :(
        options: Record<string, any>[], // The select options, no implemented yet
      }
  ),
};

type path = string;

type options = {
  styles?: FlattenSimpleInterpolation, // (A `styled-components` css interpolation. Ex: css`background:red;`)
  options?: {
    baseUrl?: string, // Your API URL
    requestHeaders?: HeadersInit, // HTTP request headers
    method?: "POST" | "PUT", // HTTP request method
    validateOnBlur?: boolean, // If needs validate on field blur
  },
};
```

#### Set `global` configs with `setFormConfig({ styles, options })` helper function

If you want to set default configurations for every `Form` in the application, like a CSS styles for your inputs, you can use `setFormConfig({ styles, options})`.

The `options` param is the same of the hook `useForm(fields, path, options?)`.

All default configurations can be replaced on every single `Form`, when you set new `options` on `useForm(fields, path, options?)` call.

#### Set `styles` for form

Use `setFormConfig({ styles })` to define global styles for every `Form` in the application, or set custom styles for every single `Form` setting the `options` param on `useForm(fields, path, options?)`;

The `styles` param it's a `styled-components` css interpolation.

```jsx
import { css } from "styled-components";

const globalStyles = css`
  input {
    background: red;
    border: 2px solid green;
  }
`;

setFormConfig({ styles: globalStyles });
```

## How does the form request works?

Just the browser `fetch` native API.

## That's it for now

I continue and will continue to implement new features for this library, but for now we are limited (but functional) to the features listed above.

Feel free to open issues, forks and new implementations :)
