/* database controllers for Booking model */
const Booking = require("../models/booking");
const Car = require("../models/car");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const selectFields =
  "_id user car bookedtime pickuptime returntime cost location status";
exports.create_booking = (req, res, next) => {
  const booking = new Booking({
    _id: new mongoose.Types.ObjectId(),
    bookedBy: req.body.bookedBy,
    createdBy: req.body.createdBy,
    tripId: req.body.tripId,
    bookingTime: req.body.bookingTime,
  });
  booking.save().then((booking) => {
    res.json("New booking added");
    console.log(booking);
  });
};

// obtain all customers bookings from the system
exports.get_all_bookings = (req, res, next) => {
      Booking.find()
        .then((bookings) => {
          res.status(200).json({ bookings });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: `Unable to GET all bookings`, error: error });
        });
    }
//   });
// };

// get all bookings from a particular user
exports.get_user_bookings = (req, res, next) => {
  const customerId = req.body.loggedInUserId.id;
  console.log(req.body);
  console.log("Hi");
  console.log(customerId);

  Booking.find({ $or: [{ bookedBy: customerId }, { createdBy: customerId }] })
    .then((bookings) => {
      res.status(200).json({ bookings }); // Send the bookings in the response
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// obtain a booking from the user sending the request
exports.get_user_booking = (req, res, next) => {
};

// get a particular booking by id
exports.get_booking = (req, res, next) => {
    const id = req.params.bookingId;
    Booking.findOne({ _id: id })
      .select(selectFields)
      .exec()
      .then((booking) => {
        const response = {
          booking: booking,
        };
        res.status(200).json(response);
      })
      .catch((error) => {
        res
          .status(500)
          .json({
            message: `Unable to GET booking of id '${id}'`,
            error: error,
          });
      });
//   });
};

// update a booking object, mainly used for changing booking status
exports.update_booking = (req, res, next) => {
  var token = req.headers["authorization"].replace(/^Bearer\s/, "");

  if (!token)
    // return 401 response if JWT doesn't exist in request
    return res.status(401).send({ auth: false, message: "No token provided." });

  // attempt to verify JWT
  jwt.verify(token, keys.secretOrKey, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    const id = req.params.bookingId;
    const updateOps = {};
    for (const ops of Object.entries(req.body)) {
      updateOps[ops[0]] = ops[1];
    }
    Booking.update({ _id: id }, { $set: updateOps })
      .select(selectFields)
      .exec()
      .then((booking) => {
        if (req.body.status === "Picked up") {
          Car.update(
            { _id: req.body.car },
            { $set: { currentbooking: req.body._id } }
          )
            .select("currentbooking")
            .exec();
        } else if (req.body.status === "Returned") {
          Car.update({ _id: req.body.car }, { $set: { currentbooking: null } })
            .select("currentbooking")
            .exec();
        }
        const response = {
          message: `Updated booking of id '${booking._id}' successfully`,
          booking: booking,
        };
        res.status(200).json({ response });
      })
      .catch((error) => {
        res
          .status(500)
          .json({
            message: `Unable to UPDATE booking of id '${id}'`,
            error: error,
          });
      });
  });
};

// obtain a user's upcoming booking if any
exports.get_upcoming_booking = (req, res, next) => {
  var token = req.headers["authorization"].replace(/^Bearer\s/, "");

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, keys.secretOrKey, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    Booking.find({ status: "Picked up", user: decoded.id })
      .sort({ returntime: 1 })
      .then((bookings) => {
        var resSent = false;
        bookings.forEach((booking) => {
          if (!resSent) {
            res.status(200).json(booking);
            resSent = true;
          }
        });
        if (!resSent) {
          Booking.find({
            returntime: { $gte: localiseTimeZone(new Date()) },
            user: decoded.id,
            status: "Confirmed",
          })
            .sort({ pickuptime: 1 })
            .then((bookings) => {
              if (bookings.length !== 0) {
                res.status(200).json(bookings[0]);
              } else {
                res.status(200).json({});
              }
            });
        }
      });
  });
};

function localiseTimeZone(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}
