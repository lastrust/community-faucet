import { inputHandler } from "@/util/inputUtil";
import { useState } from "react";

export const useInputs = <T extends { [k in string]: string }>(initial: T) => {
  const [value, setValue] = useState(initial);
  const setter = (key: keyof T) => (v: string) =>
    setValue({ ...value, [key]: v });
  const handler = (key: keyof T) => inputHandler(setter(key));
  return { value, setValue, setter, handler };
};
