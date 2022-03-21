import { createContext } from "react";

export interface ContextType {
  value: number;
  setValue?: (value: number) => void;
}

export const Context = createContext<ContextType>({
  value: 0,
  setValue: () => {},
});
