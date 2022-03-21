import React from "react";

import { Context } from "./Context";

export interface ContextProviderProps {
  children: React.ReactNode;
  value: number;
}

const ContextProvider = (props: ContextProviderProps) => {
  const { children, value } = props;

  const context = React.useMemo(() => ({ value }), [value]);

  console.log("ContextProvider");

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default React.memo(
  ContextProvider,
  (prev, next) => prev.value === next.value
);
