const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async ({ userInput: { name, email, password } }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      console.log('user: ', user);

      const result = await user.save();

      console.log('result: ', result)

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }
    const token = jwt.sign({ userId: user.id, email }, 'supersecretkey', {
      expiresIn: '1h',
    });
    return { name: user.name, userId: user.id, token, tokenExpiration: 1 };
  },
};
