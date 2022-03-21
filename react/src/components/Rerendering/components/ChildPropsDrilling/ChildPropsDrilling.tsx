import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

export interface ChildPropsDrillingProps {
  value: number;
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const ChildPropsDrilling = (props: ChildPropsDrillingProps) => {
  const { id = "child-props-drilling", value, className } = props;

  const classes = useStyles(props);

  console.log("ChildPropsDrilling");

  return (
    <div id={id} className={clsx(classes.root, className)}>
      <Typography>{value}</Typography>
    </div>
  );
};

export default React.memo(ChildPropsDrilling);
