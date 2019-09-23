import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: 56,
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      marginBottom: 65
    }
  },
  paper: {
    marginRight: theme.spacing(2)
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
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {console.log(this.props)}
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
                    value={this.props.query || ''}
                    onChange={this.props.onChange}
                  />
                </form>
              </div>
            </Typography>
            <div
              className={classes.language}
              style={{ position: "absolute", right: 10 }}
            >
              <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                color="inherit"
                variant="outlined"
                style={{ textTransform: "uppercase" }}
              >
                {this.props.language}
              </Button>
              <Popper
                open={open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem
                            id="en"
                            onClick={this.props.handleLangChange}
                          >
                            EN
                          </MenuItem>
                          <MenuItem
                            id="ru"
                            onClick={this.props.handleLangChange}
                          >
                            RU
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
