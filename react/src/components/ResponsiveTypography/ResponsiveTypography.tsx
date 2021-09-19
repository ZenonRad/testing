import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import Typographies from './components/Typographies';
import EmRules from './components/EmRules';

import useStyles from './styles';

export interface IResponsiveTypographyProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const ResponsiveTypography = (props: IResponsiveTypographyProps) => {
  const { id = 'responsive-typography', className } = props;

  const classes = useStyles(props);

  return (
    <Grid
      container
      {...{
        direction: 'column',
        justify: 'center',
        alignItems: 'center',
        id,
        classes: { root: clsx(classes.root, className) },
      }}>
      <Grid item container justify="space-evenly">
        <Grid item>
          <Typographies />
        </Grid>

        <Grid item>
          <EmRules />
        </Grid>
      </Grid>

      <Grid item container justify="space-evenly"></Grid>
    </Grid>
  );
};

export default ResponsiveTypography;
