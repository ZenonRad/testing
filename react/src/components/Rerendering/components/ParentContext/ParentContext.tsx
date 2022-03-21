import React from "react";
import clsx from "clsx";

import ChildContext from "../ChildContext";

import useStyles from "./styles";

export interface ParentContextProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const ParentContext = (props: ParentContextProps) => {
  const { id = "parent-context", className } = props;

  const classes = useStyles(props);

  console.log("ParentContext");

  return (
    <div id={id} className={clsx(classes.root, className)}>
      <ChildContext />
    </div>
  );
};

export default React.memo(ParentContext);
