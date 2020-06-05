import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';

import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

import AuthContext from '../context/AuthContext';

const styles = (theme) => ({
  title: {
    fontSize: 32,
    fontFamily: 'Leckerli One',
    textTransform: 'capitalize',
    letterSpacing: '2px',
    fontWeight: '100',
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    lineHeight: '40px',
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    fontFamily: 'Leckerli One',
    fontWeight: '100',
    marginLeft: '1em',
    cursor: 'pointer',
  },
  menu: {
    border: '1px solid black',
  },
  menuLink: {
    display: 'inline-flex',
  },
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

function MainNav(props) {
  const { classes } = props;
  const { token, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'talento'}
          </Link>

          <div className={classes.right}>
            {!token && (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/signin"
                >
                  {'Sign In'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href="/signup"
                >
                  {'Sign Up'}
                </Link>
              </>
            )}
            {token && (
              <>
                <Avatar
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.avatar}
                >
                  {'J'}
                </Avatar>
                <StyledMenu
                  id="customized-menu"
                  className={classes.menu}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link
                      className={classes.menuLink}
                      underline="none"
                      href="/dashboard"
                      alt="dashboard"
                    >
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      className={classes.menuLink}
                      underline="none"
                      href="/inbox"
                      alt="inbox"
                    >
                      <ListItemIcon>
                        <InboxIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                    </Link>
                  </MenuItem>
                  <Divider className={classes.divider} />

                  <MenuItem>
                    <Link
                      className={classes.menuLink}
                      underline="none"
                      alt="logout"
                      onClick={logout}
                    >
                      <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </Link>
                  </MenuItem>
                </StyledMenu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainNav);
