import { Input, Form } from './components';
import { setGlobalConfig } from './config';

function App() {
  setGlobalConfig({ options: { baseUrl: 'https://myapi.com' } });

  return (
    <div className="App">
      <Form path="/post-path">
        {({ promiseState }) => (
          <>
            <label htmlFor="name">Name</label>
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

export default App;
