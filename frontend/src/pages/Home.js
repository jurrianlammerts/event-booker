import withRoot from '../withRoot';

import React from 'react';
import ProductCategories from '../views/ProductCategories';
import ProductSmokingHero from '../views/ProductSmokingHero';
import MainFooter from '../views/MainFooter';
import ProductHero from '../views/ProductHero';
import ProductHowItWorks from '../views/ProductHowItWorks';
import ProductCTA from '../views/ProductCTA';
import MainNav from '../views/MainNav';

function Index() {
  return (
    <React.Fragment>
      <MainNav />
      <ProductHero />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
