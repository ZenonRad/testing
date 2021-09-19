import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '200px',
    },

    nested: {
      fontSize: '0.5em',
      marginBottom: '1em',
    },
  }),
);
