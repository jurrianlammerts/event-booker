import withRoot from '../withRoot';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RoomIcon from '@material-ui/icons/Room';

import Typography from '../components/Typography';
import MainNav from '../views/MainNav';
import MainFooter from '../views/MainFooter';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  avatar: {
    width: '60px',
    height: '60px',
    margin: '24px auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    fontFamily: 'Leckerli One',
    fontWeight: '100',
  },
  profile: {
    textAlign: 'center',
  },
  detailLine: {
    display: 'inline-flex',
    verticalAlign: 'top',
  },
  detail: {
    padding: '4px',
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MainNav />
      <React.Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>{'J'}</Avatar>
              <Typography className={classes.profile} variant="h5">
                {'Jurrian'}
              </Typography>
              <Divider className={classes.divider} />
              <div className={classes.detailLine}>
                <RoomIcon />
                <Typography variant="body2" className={classes.detail}>
                  {'Rotterdam, The Netherlands'}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </React.Fragment>
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(Dashboard);
