const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transfromBookings } = require('./merge');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transfromBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async ({ eventId }) => {
    const fetchedEvent = await Event.findOne({ _id: eventId });
    const booking = new Booking({
      user: '5dc0a45597b3ca69c3918745',
      event: fetchedEvent
    });
    const result = await booking.save();
    return transfromBooking(result);
  },
  cancelBooking: async ({ bookingId }) => {
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      const event = transfromEvent(booking.event);
      await Booking.deleteOne({ _id: bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
