import React from "react";
import { makeStyles,Typography,Paper } from "@material-ui/core/";

const UseStyles = makeStyles((theme) => ({
    paperHeading: {
      marginTop:'10px',  
      padding: "10px",
      minHeight: "60px",
      backgroundColor: "#7986cb",
      marginBottom: "10px",
      textAlign: "center",
    },
  }));
  
const PageHeader = (props) => {
    const classes = UseStyles();
  return (
    <Paper className={classes.paperHeading} elevation={1}>
      <Typography variant="h5" gutterBottom justifyContent="left">
        <b>{props.text} </b>
      </Typography>
    </Paper>
  );
};

export default PageHeader;
