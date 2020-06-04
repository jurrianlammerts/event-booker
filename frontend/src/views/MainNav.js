import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
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
  leftLinkActive: {
    color: theme.palette.common.white,
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
  },
});

function MainNav(props) {
  const { token, logout } = useContext(AuthContext);
  const { classes } = props;

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
                <Link
                  variant="h6"
                  underline="none"
                  href="#"
                  alt="logout"
                  className={classes.rightLink}
                  onClick={logout}
                >
                  Logout
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href="/dashboard"
                >
                  <Avatar className={classes.avatar}>{'J'}</Avatar>
                </Link>
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
