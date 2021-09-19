import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

export interface ITypographiesProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const Typographies = (props: ITypographiesProps) => {
  const { id = 'typographies', className } = props;

  const classes = useStyles(props);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      {...{ id, classes: { root: clsx(classes.root, className) } }}>
      <Typography variant="h5">H5</Typography>
      <Typography variant="h6">H6</Typography>
      <Typography variant="subtitle1">subtitle1</Typography>
      <Typography variant="subtitle2">subtitle2</Typography>
      <Typography variant="body1">body1</Typography>
      <Typography variant="body2">body2</Typography>
    </Grid>
  );
};

export default Typographies;
