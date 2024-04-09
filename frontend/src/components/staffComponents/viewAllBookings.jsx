/* View all bookings page */
import React, { Component } from 'react';
import { Alert, Button, Table, Container } from 'react-bootstrap';
import BookingServiceApi from '../../api/BookingServiceApi';
const { default: LocationServiceApi } = require("../../api/LocationServiceApi");
const { default: UserServiceApi } = require("../../api/UserServiceApi");

export default class ViewAllBookingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            locations: [],
            cars: [],
            errorMessage: ''
        };
    }

    componentDidMount() {
        // obtain all bookings, locations and cars for rendering
        BookingServiceApi.getAllBookings()
        .then(async (res) => {
        console.log("Bookings response:", res.data);

        // Array to store promises of fetching user details
        const userPromises = res.data.bookings.map(async (booking) => {
          try {
            // Fetch user details for bookedBy and createdBy
            const locationResponse = await LocationServiceApi.getLocationFromId(booking.tripId);
            const bookedByResponse = await UserServiceApi.getUserFromId(booking.bookedBy);
            const createdByResponse = await UserServiceApi.getUserFromId(booking.createdBy);

            console.log(booking.tripId);
            console.log(booking.createdBy);

            // Update booking object with user names
            console.log(locationResponse.data)
            return {
              ...booking,
              bookedByName: bookedByResponse.data.user.firstname + " " + bookedByResponse.data.user.lastname ,
              createdByName: createdByResponse.data.user.firstname + " " + createdByResponse.data.user.lastname,
              from: locationResponse.data.from,
              to: locationResponse.data.to,
              startTime: locationResponse.data.startTime.toLocaleString().replace("T", " "),
              cost: locationResponse.data.cost,
            };
          } catch (error) {
            console.error("Error fetching user details:", error);
            // Return booking without user names if an error occurs
            return {
              ...booking,
              bookedByName: "N/A",
              createdByName: "N/A"
            };
          }
        });

        // Wait for all user detail promises to resolve
        const bookingsWithUserDetails = await Promise.all(userPromises);

        this.setState({
          bookings: bookingsWithUserDetails,
          errorMessage: "",
        });

        console.log(this.state.bookings);
        console.log(res.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        this.setState({ errorMessage: error.response.data.message });
      });
    }

    render() {
        return (
            <Container>
                {this.state.errorMessage && <Alert variant="danger">
                    <Alert.Heading>Error fetching all bookings!</Alert.Heading>
                    <p>
                        {this.state.errorMessage}
                    </p>
                </Alert>}
                <h2>View All Bookings</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Created By</th>
                            <th>Booked By</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Cost</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bookings.map(booking =>
                            <tr>
                                <td>{booking._id}</td>
                                <td>{booking.bookedByName}</td>
                                <td>{booking.createdByName}</td>
                                <td>{booking.from}</td>
                                <td>{booking.to}</td>
                                <td>₹ {booking.cost}</td>
                                <td>
                                    <Button href={`/admin/view/bookings/${booking.id}`}>View</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        )
    }
}
