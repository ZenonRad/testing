import React from "react";
import clsx from "clsx";

import ChildPropsDrilling from "../ChildPropsDrilling";

import useStyles from "./styles";

export interface ParentPropsDrillingProps {
  value: number;
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const ParentPropsDrilling = (props: ParentPropsDrillingProps) => {
  const { id = "parent-props-drilling", value, className } = props;

  const classes = useStyles(props);

  console.log("ParentPropsDrilling");

  return (
    <div id={id} className={clsx(classes.root, className)}>
      <ChildPropsDrilling value={value} />
    </div>
  );
};

export default React.memo(ParentPropsDrilling);
