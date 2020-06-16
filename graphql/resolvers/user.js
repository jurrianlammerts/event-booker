const User = require('../../models/user');

module.exports = {
  getUser: async ({ id }) => {
    try {
      console.log('userId: ', id);
      const user = await User.findById(id);
      console.log('user: ', user);
      return user;
    } catch (err) {
      throw err;
    }
  },
};
