/* Booking model definition */
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: String, required: true },
    bookingTime: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
