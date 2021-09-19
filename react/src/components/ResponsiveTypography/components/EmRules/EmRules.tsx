import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';

export interface IEMRulesProps {
  id?: string;
  className?: string;
  classes?: Partial<Record<keyof ReturnType<typeof useStyles>, string>>;
}

const EmRules = (props: IEMRulesProps) => {
  const { id = 'em-rules', className } = props;

  const classes = useStyles(props);

  return (
    <Grid {...{ id, classes: { root: clsx(classes.root, className) } }}>
      <div className={classes.nested}>
        {'Nested 1'}

        <div className={classes.nested}>
          {'Nested 2'}

          <div className={classes.nested}>Nested 3</div>
        </div>
      </div>
    </Grid>
  );
};

export default EmRules;
