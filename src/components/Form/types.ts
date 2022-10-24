import React from "react";

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  inputsRef: React.MutableRefObject<HTMLInputElement[]>;
};
