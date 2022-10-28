import { Input, Form } from './components';
import { setGlobalConfig } from './config';

function App() {
  setGlobalConfig({ options: { baseUrl: 'https://myapi.com' } });

  return (
    <div className="App">
      <Form path="/post-path">
        {({ promiseState, formState }) => (
          <>
            <label htmlFor="name">Name</label>
            <Input id="name" validations={[/\w/]} />

            {formState?.invalidFields.includes('name') !== false && 'Invalid field'}

            <label htmlFor="email">Email</label>
            <Input id="email" validations={[/\w/]} />

            {formState?.invalidFields.includes('email') !== false && 'Invalid field'}

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

export default App;
