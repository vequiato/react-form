import { useAtom } from "jotai";

import { FormConfig } from "./types";
import { formConfigAtom } from "./atoms";

export function useConfig({ styles }: FormConfig) {
  const [formConfig, setFormConfig] = useAtom(formConfigAtom);

  setFormConfig({ styles });

  return { formConfig };
}

export type { FormConfig };
export { formConfigAtom };
export default useConfig;
