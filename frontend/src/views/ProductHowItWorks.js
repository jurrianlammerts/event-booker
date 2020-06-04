import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import AuthContext from '../context/AuthContext';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  svg: {
    height: 55,
    fontSize: 48,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function ProductHowItWorks(props) {
  const { token } = useContext(AuthContext);
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Get work done faster, with confidence
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <VerifiedUserIcon className={classes.svg} />
                <Typography variant="h5" align="center">
                  Payment protection, guaranteed
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <MonetizationOnIcon className={classes.svg} />
                <Typography variant="h5" align="center">
                  Know the price up front
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <AccountBalanceIcon className={classes.svg} />
                <Typography variant="h5" align="center">
                  Always the best legal counseling
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        {token ? (
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.button}
            component="a"
            href="/dashboard"
          >
            Dashboard
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.button}
            component="a"
            href="/signup"
          >
            Register
          </Button>
        )}
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
