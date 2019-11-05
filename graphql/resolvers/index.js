const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput: { title, description, price, date } }) => {
    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date).toISOString(),
      creator: user.bind(this, result._doc.creator)
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        date: new Date(event._doc.date).toISOString()
      };
      const user = await User.findById('5dc0a45597b3ca69c3918745');

      if (!user) {
        throw new Error('User not found.');
      }
      user.createdEvents.push(event);
      await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ userInput: { email, password } }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashedPassword
      });

      const result = await newUser.save();

      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  }
};
