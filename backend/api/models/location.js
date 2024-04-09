/* Location model definition */
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: String,
    to: String,
    startTime: String,
    endTime: String,
    vehicleNo: String,
    cost: String,
    // cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

module.exports = mongoose.model('Location', locationSchema);
