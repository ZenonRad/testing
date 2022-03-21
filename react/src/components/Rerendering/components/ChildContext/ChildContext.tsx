import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

import { Context } from "../ContextProvider/Context";

import useStyles from "./styles";

export interface ChildContextProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const ChildContext = (props: ChildContextProps) => {
  const { id = "child-context", className } = props;

  const classes = useStyles(props);

  const { value } = React.useContext(Context);

  console.log("ChildContext");

  return (
    <div id={id} className={clsx(classes.root, className)}>
      <Typography>{value}</Typography>
    </div>
  );
};

export default React.memo(ChildContext);
