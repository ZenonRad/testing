import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ParentPropsDrilling from "./components/ParentPropsDrilling";
import ParentContext from "./components/ParentContext";
import ContextProvider from "./components/ContextProvider";

import useStyles from "./styles";

export interface RerenderingProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const Rerendering = (props: RerenderingProps) => {
  const { id = "rerendering", className } = props;

  const classes = useStyles(props);

  const [drillingValue, setDrillingValue] = React.useState(0);
  const [contextValue, setContextValue] = React.useState(0);

  return (
    <Grid
      container
      wrap="nowrap"
      justifyContent="space-around"
      alignItems="center"
      id={id}
      classes={{ root: clsx(classes.root, className) }}
    >
      <Grid item container className={classes.item}>
        <Grid item container wrap="nowrap" alignItems="center" spacing={1}>
          <Grid item>
            <Typography>Props Drilling</Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setDrillingValue((prev) => prev + 1);
              }}
            >
              <Typography>Increment</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <ParentPropsDrilling value={drillingValue} />
        </Grid>
      </Grid>
      <Grid item container className={classes.item}>
        <Grid item container wrap="nowrap" alignItems="center" spacing={1}>
          <Grid item>
            <Typography>Context</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setContextValue((prev) => prev + 1)}>
              <Typography>Increment</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <ContextProvider value={contextValue}>
            <ParentContext />
          </ContextProvider>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Rerendering;
