import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Search from "../Search/Search";
import SearchResult from "../Search/SearchResult";

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "15px",
    backgroundColor: "#e1f5fe",
    minHeight:'800px;'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "500px",
  },
}));
const HomePage = (props) => {
  const classes = UseStyles();
  const [isSearchBtnClick, searchBtnClick] = useState(true);

  const loadMap_ListView = (
    <div style={{}}> 
         <SearchResult></SearchResult>
    </div>
  );

  return (
    <div className={classes.root}>
      <div style={{}}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <div style={{}}>
              <Paper className={classes.paper} style={{ height: "150px" }}>
                <Search></Search>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
      {isSearchBtnClick ? loadMap_ListView : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.search,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(HomePage);
