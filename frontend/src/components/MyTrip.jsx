/* Bookings details page */
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Spinner from "./Spinner.jsx";
import BookingServiceApi from "../api/BookingServiceApi";
import LocationServiceApi from "../api/LocationServiceApi";
import UserServiceApi from "../api/UserServiceApi";

class MyTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      isLoading: false,
    };
    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.getBookingDetails = this.getBookingDetails.bind(this);
  }

  getBookingDetails(loggedInUserId) {
    console.log("Fetching bookings for user ID:", loggedInUserId);
    this.setState({ isLoading: true });
    BookingServiceApi.getUserBookings({ loggedInUserId })
      .then(async (res) => {
        console.log("Bookings response:", res.data);

        // Array to store promises of fetching user details
        const userPromises = res.data.bookings.map(async (booking) => {
          try {
            // Fetch user details for bookedBy and createdBy
            const locationResponse = await LocationServiceApi.getLocationFromId(
              booking.tripId
            );
            const bookedByResponse = await UserServiceApi.getUserFromId(
              booking.bookedBy
            );
            const createdByResponse = await UserServiceApi.getUserFromId(
              booking.createdBy
            );

            console.log(booking.tripId);
            console.log(booking.createdBy);

            // Update booking object with user names
            console.log(locationResponse.data);
            return {
              ...booking,
              bookedByName:
                bookedByResponse.data.user.firstname +
                " " +
                bookedByResponse.data.user.lastname,
              createdByName:
                createdByResponse.data.user.firstname +
                " " +
                createdByResponse.data.user.lastname,
              from: locationResponse.data.from,
              to: locationResponse.data.to,
              startTime: locationResponse.data.startTime
                .toLocaleString()
                .replace("T", " "),
            };
          } catch (error) {
            console.error("Error fetching user details:", error);
            // Return booking without user names if an error occurs
            return {
              ...booking,
              bookedByName: "N/A",
              createdByName: "N/A",
            };
          }
        });

        // Wait for all user detail promises to resolve
        const bookingsWithUserDetails = await Promise.all(userPromises);

        this.setState({
          bookings: bookingsWithUserDetails,
          errorMessage: "",
        });

        this.setState({ isLoading: false });
        console.log(this.state.bookings);
        console.log(res.data.bookings);

      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  handleCancelButton() {
    // modify booking status to cancelled
    let booking = this.state.booking;
    booking.status = "Cancelled";
    booking.id = booking._id;
    this.setState({
      booking: booking,
    });
    BookingServiceApi.modifyBooking(this.state.booking)
      .then(() => {
        this.getBookingDetails();
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  componentDidMount() {
    const loggedInUserId = UserServiceApi.getLoggedInUserDetails();
    console.log("Logged In User ID:", loggedInUserId);
    this.getBookingDetails(loggedInUserId);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <div className="container">
          <h2>Booking details</h2>
          {this.state.errorMessage && (
            <Alert variant="danger">
              <Alert.Heading>Error obtaining booking!</Alert.Heading>
              <p>{this.state.errorMessage}</p>
            </Alert>
          )}
          {!this.state.errorMessage && (
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Booked By</th>
                  <th>Trip Created By</th>
                  <th>From</th>
                  <th>To</th>
                  <th>When</th>
                  <th>Booking Time</th>
                </tr>
              </thead>
              {isLoading && <Spinner />}
              {!isLoading && (
                <>
                <tbody>
                  {this.state.bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>{booking.bookedByName}</td>
                      <td>{booking.createdByName}</td>
                      <td>{booking.from}</td>
                      <td>{booking.to}</td>
                      <td>{booking.startTime}</td>
                      <td>{booking.bookingTime}</td>
                    </tr>
                  ))}
                </tbody>
                  </>
              )}
            </table>
          )}
        </div>
      </>
    );
  }
}

export default MyTrips;
