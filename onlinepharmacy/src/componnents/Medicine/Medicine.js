import React from "react";
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper'
const Medicine =() =>{


    return (
        <div>
            <Grid container spacing={1}>
            <Grid item spacing={1} lg={1}></Grid>
            <Grid item spacing={1} lg={2} >
                  <Paper className={1} elevation={1}>
                      <Typography variant="headline" component="h3">
                          
                       </Typography>
                  </Paper>
                  <Paper className={1} elevation={1}>
                      <Typography variant="headline" component="h3">
                           Information About Paracetamol
                       </Typography>
                       Paracetamol Uses
                       How Paracetamol works
                       Common side effects of Paracetamol
                  </Paper>
                  <Paper className={1} elevation={1}>
                      <Typography variant="headline" component="h3">
                          Your content here.
                       </Typography>
                  </Paper>
                  <Paper className={1} elevation={1}>
                      <Typography variant="headline" component="h3">
                           CONTENT DETAILS
                       </Typography>
                  </Paper>
            </Grid>
            <Grid item spacing={1}></Grid>
            </Grid>
        </div>
    );
}

export default Medicine;

