import { atom } from "jotai";

import { FormConfig } from "./types";

export const formConfigAtom = atom<{
  styles: FormConfig["styles"];
} | null>(null);
