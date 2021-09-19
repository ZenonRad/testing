import React from "react";
import { FormattedMessage } from "react-intl";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";

import useStyles from "./styles";

export interface IFreezingEventLoopProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const FreezingEventLoop = (props: IFreezingEventLoopProps) => {
  const { id = "freezing-event-loop", className } = props;

  const classes = useStyles(props);

  return (
    <Grid {...{ id, classes: { root: clsx(classes.root, className) } }}></Grid>
  );
};

export default FreezingEventLoop;
