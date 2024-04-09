/* database controllers for Location model */
const Location = require('../models/location');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const selectFields = '_id name address cars';

// get all locations from system
exports.get_all_locations = (req, res) => {
    Location.find()
        .then((locations) => {res.status(200).json({ locations });})
        // return error if there's any
        .catch(err => res.status(400).json('Error: ') + err);
}

// get a location by id
exports.get_location = (req, res) => {
    const id = req.params.locationId;
    Location.findById(id)
        .then(location => res.json(location))
        // return error if there's any
        .catch(err => res.status(400).json('Error: ' + err));
}

// update location object by id
exports.update_location = (req, res) => {
    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (!token)
        // return 401 response if JWT doesn't exist in request
        return res.status(401).send({ auth: false, message: 'No token provided.' });

    // attempt to verify JWT
    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        if (decoded.usertype !== 'staff' && decoded.usertype !== 'admin') {
            return res.status(500).json({ message: `Unable to perform action, you have to be hvtfgstaff member!` });
        } else {
            const id = req.params.locationId;
            const updateOps = {};
            for (const ops of Object.entries(req.body)) {
                updateOps[ops[0]] = ops[1];
            }
            Location.update({ _id: id }, { $set: updateOps })
                .select(selectFields)
                .exec()
                .then(location => {
                    // return success message in response
                    const response = {
                        message: `Updated location of id '${location._id}' successfully`
                    }
                    res.status(200).json({ response });
                })
                .catch(error => {
                    // return error if there's any
                    res.status(500).json({ message: `Unable to UPDATE location of id '${id}'`, error: error });
                });
        }
    });
}

// create location object
exports.create_location = loc = (req, res) => {
                    // create a location object
                    console.log(req);
                    console.log(res);
                    const location = new Location({
                        _id: new mongoose.Types.ObjectId(),
                        user: req.body.user,
                        from: req.body.from,
                        to: req.body.to,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                        vehicleNo: req.body.vehicleNo,
                        cost: req.body.cost,

                    });
                    // save location object and return success message in response
                    location.save().then(location => {
                        res.json('New location added');
                        console.log(location);
                    });
}
