import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import * as apiDefaults from "../../../src/apiDefaultValues";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const UseStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: "10px",
    minHeight: "800px",
    backgroundColor: "#e1f5fe",
  },

  paperHeading:{
    padding: "10px",
    minHeight: "60px",
    backgroundColor: "#7986cb",
    marginBottom:'10px',
    textAlign:'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  medDiv: {
    border: "1px solid #e8e8e8",
    padding: "5px",
    margin: "5px",
    backgroundColor:'#e8eaf6',
    borderRadius:'10px'
  },
  medList: {
    padding: "5px",
    width: "90%",
    marginLeft: "4%",
  },
  accordian:{
} 
}));

const Order = () => {
  const classes = UseStyles();
  const [orders, setorders] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    (async function () {
      try {
        setisLoading(true);
        const apiParam = {
          userId:apiDefaults.USER_ID,
        };
        const response = await fetch(
          apiDefaults.GET_USER_ORDERS,
          apiDefaults.POST_API_HEADER(apiParam)
        );
        const json = await response.json();

        //console.log("data from orders " + JSON.stringify(json));
        setisLoading(false);
        setorders(json["result"]["data"]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const orderDetails = (
    <div style={{}}>
      {orders.map((order, index) => (
        <Accordion className={classes.accordian}
          expanded={expanded === "panel" + order.order_id}
          onChange={handleChange("panel" + order.order_id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item lg={1}>
                <Avatar>ORD</Avatar>
              </Grid>
              <Grid item lg={2}>
                {order.order_number}
              </Grid>
              <Grid item lg={2}>
                {order.shopname}
              </Grid>
              <Grid item lg={2}>
                {order.order_date}
              </Grid>
              <Grid item lg={2}>
                {order.order_status}
              </Grid>
              <Grid item lg={2}>
                {order.order_amount}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.medList} style={{ padding: "10px" }}>
              {order.order_med_details.map((med, i) => (
                <div className={classes.medDiv}>
                  <ListItem>
                    <Grid container spacing={5}>
                      <Grid item lg={2}>
                        <Avatar className={classes.orange}>Tab</Avatar>
                      </Grid>
                      <Grid item lg={2}>
                        {med.medicineName}
                      </Grid>
                      <Grid item lg={2}>
                        {med.quantity}
                      </Grid>
                      <Grid item lg={2}>
                        {med.price}
                      </Grid>
                    </Grid>
                  </ListItem>
                </div>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );

  return (
    <div>
      <Paper className={classes.paper} elevation={3} justifyContent="left">
        <Grid container spacing={5} justifyContent="left" alignItems="left">
          <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
          <Grid item lg={10} md={10} sm={12} xs={12}>
            <div>
              <Paper className={classes.paperHeading} elevation={1}>
                <Typography variant="h5" gutterBottom justifyContent="left">
                  <div><b>Your Orders</b></div>
                </Typography>
              </Paper>
              {isLoading ? <CircularProgress /> : orderDetails}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Order;
