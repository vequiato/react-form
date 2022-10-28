# react-amazing-form

An awesome `Form` with stateless `Inputs` for your React application.
We don't need to rerender on every single letter inputed!
So yes, the `onChange` of `Inputs` is disabled in the lib, because you don't need it :)

## Installation

```
# Yarn
yarn add react-amazing-form

# NPM
npm install react-amazing-form
```

## Usage

```jsx
import { Form, Input, setGlobalConfig } from 'react-amazing-form';

function App() {
  // The global configs will be used in all application's <Form/>
  // but you can change in every different <Form/>
  // passing the options param to it
  setGlobalConfig({ options: { baseUrl: 'https://myapi.com' } });

  return (
    <div className="App">
      {/*By default the fields are validated when the form is submitted, 
      but you can change it to validate onBlur by setting validateOnBlur 
      as a property of the form*/}
      <Form path="/post-path">
        {({ promiseState }) => (
          <>
            <label htmlFor="name">Name</label>
            {/* When one field is invalid (didn't pass in validation) 
            it will stay with data-valid="false", so you can use this 
            to style the invalid field */}
            <Input id="name" validations={[/\w/]} />

            <label htmlFor="email">Email</label>
            <Input id="email" validations={[/\w/]} />

            {promiseState.error?.message}

            <button type="submit" disabled={promiseState.status === 'loading'}>
              Send
            </button>
          </>
        )}
      </Form>
    </div>
  );
}
```

In the example above, the request's `body` would be:

```json
{
  "name": "",
  "email": ""
}
```

## How does the form submit works?

By default, the lib uses the native `fetch` API, but you can use `onSubmit` itself as a property on the `<Form/>`.

`onSubmit` The function will receive as arguments the form fields with values (if all fields pass validation).

## And about the `<Form/>'s` styles?

In the future I will implement a UI lib with native styles, I promise.

For now, you can use your favorite styles lib and style the `<Form/>` and `<Input/>` components with it.

## That's it for now

I continue and will continue to implement new features for this library, but for now we are limited (but functional) to the features listed above.

Feel free to open issues, forks and new suggest implementations :)
