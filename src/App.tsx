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

export default App;
