const authResolver = require('./auth');
const eventResolver = require('./events');
const bookingResolver = require('./booking');
const userResolver = require('./user');

const rootResolver = {
  ...userResolver,
  ...authResolver,
  ...eventResolver,
  ...bookingResolver
};

module.exports = rootResolver;
