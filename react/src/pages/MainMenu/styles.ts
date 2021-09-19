import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
  createStyles({
    root: {
      height: "100%",
      backgroundColor: theme.palette.primary.dark,

      "& .MuiButton-root": {
        backgroundColor: theme.palette.background.paper,

        "&:hover": {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
  })
);
