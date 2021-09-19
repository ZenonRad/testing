import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import useStyles from "./styles";

export interface IMainMenuProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const MainMenu = (props: IMainMenuProps) => {
  const { id = "main-menu", className } = props;

  const classes = useStyles(props);

  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
      {...{ id, classes: { root: clsx(classes.root, className) } }}
    >
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => history.push("/responsive/typography")}
        >
          <FormattedMessage id="main.menu.responsive.typography" />
        </Button>
      </Grid>

      <Grid item>
        <Button variant="outlined" onClick={() => history.push("/loop/freeze")}>
          <FormattedMessage id="main.menu.freezing.event.loop" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default MainMenu;
