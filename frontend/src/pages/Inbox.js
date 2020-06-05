import withRoot from '../withRoot';

import React from 'react';
import MainNav from '../views/MainNav';

import Chat from '../views/Chat';

function Index() {
  return (
    <React.Fragment>
      <MainNav />
        <Chat />
    </React.Fragment>
  );
}

export default withRoot(Index);
