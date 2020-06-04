import withRoot from '../withRoot';

import React from 'react';

import Typography from '../components/Typography';
import MainNav from '../views/MainNav';
import MainFooter from '../views/MainFooter';

function Dashboard() {
  return (
    <React.Fragment>
      <MainNav />
      <React.Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Dashboard
        </Typography>
      </React.Fragment>
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(Dashboard);
