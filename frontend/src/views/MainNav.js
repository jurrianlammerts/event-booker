import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import StyledLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

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
    textDecoration: 'none',
    color: theme.palette.primary.main,
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
  const { user, logout } = useContext(AuthContext);
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
          <StyledLink
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'talento'}
          </StyledLink>

          <div className={classes.right}>
            {!user && (
              <>
                <StyledLink
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/signin"
                >
                  {'Sign In'}
                </StyledLink>
                <StyledLink
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href="/signup"
                >
                  {'Sign Up'}
                </StyledLink>
              </>
            )}
            {user && (
              <>
                <Avatar
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.avatar}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <StyledMenu
                  id="customized-menu"
                  className={classes.menu}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="/dashboard" className={classes.menuLink}>
                    <MenuItem>
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.menuText}
                        primary="Dashboard"
                      />
                    </MenuItem>
                  </Link>
                  <Link to="/inbox" className={classes.menuLink}>
                    <MenuItem>
                      <ListItemIcon>
                        <InboxIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.menuText}
                        primary="Inbox"
                      />
                    </MenuItem>
                  </Link>
                  <Divider className={classes.divider} />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.menuText}
                      primary="Logout"
                    />
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
