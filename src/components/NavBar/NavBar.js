import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, InputBase, ClickAwayListener, Tooltip, Button } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: 56,
    [theme.breakpoints.up("sm")]: {
      marginBottom: 65
    }
  },
  grow: {
    flexGrow: 1
  },
  title: {
    float: "left",
    [theme.breakpoints.up("sm")]: {
      float: "none",
      margin: "0 auto"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: 250,
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 250,
      "&:focus": {
        width: 300
      }
    }
  },
  language: {
    position: "relative",
    float: "right",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing()
    }
  }
});

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      openToolTip: false
    }
  }
  handleTooltipClose = () => {
    this.setState({ openToolTip: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openToolTip: true });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              <div className={classes.grow} />
              <div className={classes.search}>
                <form onSubmit={this.props.onSubmit}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search Movies, TV Shows....."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    name="query"
                    value={this.props.query}
                    onChange={this.props.onChange}
                  />
                </form>
              </div>
            </Typography>
            <div className={classes.language} style={{position: 'absolute', right: 10}}>
              <ClickAwayListener onClickAway={this.handleTooltipClose}>
                <div>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={this.handleTooltipClose}
                    open={this.state.openToolTip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Add"
                  >
                    <Button onClick={this.handleTooltipOpen} color="inherit">Click</Button>
                  </Tooltip>
                </div>
              </ClickAwayListener>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
