import withRoot from '../withRoot';

import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Table from '../components/Table';
import Work from '@material-ui/icons/Work';

import Typography from '../components/Typography';
import MainNav from '../views/MainNav';
import MainFooter from '../views/MainFooter';
import ProfileForm from '../components/ProfileForm';

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '2rem',
  },
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
    width: '100%',
    margin: '12px 0',
  },
  detail: {
    padding: '2px 8px',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { user, profile } = useContext(AuthContext);

  console.log('user: ', user)

  return (
    <React.Fragment>
      <MainNav />
      {user && (
        <div className={classes.page}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  {user.name.charAt(0)}
                </Avatar>
                <Typography className={classes.profile} variant="h5">
                  {user.name}
                </Typography>

                {profile && (
                  <>
                    <Divider className={classes.divider} />
                    <div className={classes.detailLine}>
                      <HomeWorkIcon fontSize="small" />
                      <Typography variant="body2" className={classes.detail}>
                        {profile.role}
                      </Typography>
                    </div>

                    <div className={classes.detailLine}>
                      <Work fontSize="small" />
                      <Typography variant="body2" className={classes.detail}>
                        {profile.industry}
                      </Typography>
                    </div>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Paper className={classes.paper}>
                {profile ? <Table></Table> : <ProfileForm />}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(Dashboard);
