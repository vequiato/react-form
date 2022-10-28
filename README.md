# react-amazing-form

An awesome `Form` with stateless `Inputs` for your React application.
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
import { Form, Input, setGlobalConfig } from 'react-amazing-form';

function App() {
  // The global configs will be used in all application's <Form/>
  // but you can change in every different <Form/>
  // passing the options param to it
  setGlobalConfig({ options: { baseUrl: 'https://myapi.com' } });

  return (
    <div className="App">
      <Form path="/post-path">
        {({ error, status }) => (
          <>
            <label htmlFor="name">Name</label>
            <Input id="name" validations={[/\w/]} />

            <label htmlFor="email">Email</label>
            <Input id="email" validations={[/\w/]} />

            {error?.message}

            <button type="submit" disabled={status === 'loading'}>
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

## How does the form request works?

Just the browser `fetch` native API.

## That's it for now

I continue and will continue to implement new features for this library, but for now we are limited (but functional) to the features listed above.

Feel free to open issues, forks and new suggest implementations :)
