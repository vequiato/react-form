import useForm from "./hooks/useForm";

const test = (value: string) => {
  return value.length >= 3;
};

function App() {
  const { FormFields, Form } = useForm({
    email: {
      name: "email",
      placeholder: "",
      label: "E-mail",
      type: "text",
      value: "",
      validations: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    name: {
      name: "name",
      placeholder: "",
      type: "text",
      value: "oie",
      validations: [test],
    },
  });

  return (
    <div className="App">
      <Form onSubmit={() => console.log("tchau")}>
        <FormFields.Name />
        <FormFields.Email />
      </Form>
    </div>
  );
}

export default App;