import { css } from "styled-components";

import { FormConfig } from ".";

const styles: FormConfig["styles"] = css`
  display: flex;
  flex-direction: column;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;

  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 3px;
  }

  input {
    margin-bottom: 10px;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;

    &[data-valid="false"] {
      border-color: red;
    }
  }

  button {
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
`;

const options: FormConfig["options"] = {
  validateOnBlur: false,
};

export const initialConfig = { styles, options };
