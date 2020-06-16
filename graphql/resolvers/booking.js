const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transfromBooking, transfromEvent } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transfromBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async ({ eventId }, args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const fetchedEvent = await Event.findOne({ _id: eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
    });
    const result = await booking.save();
    return transfromBooking(result);
  },
  cancelBooking: async ({ bookingId }, args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      const event = transfromEvent(booking.event);
      await Booking.deleteOne({ _id: bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
