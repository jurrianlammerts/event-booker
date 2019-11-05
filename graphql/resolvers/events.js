const Event = require('../../models/event');
const { transfromEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transfromEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput: { title, description, price, date } }) => {
    const event = new Event({
      title: title,
      description: description,
      price: +price,
      date: new Date(date),
      creator: '5dc0a45597b3ca69c3918745'
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transfromEvent(result);
      const creator = await User.findById('5dc0a45597b3ca69c3918745');

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
