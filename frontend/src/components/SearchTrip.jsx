/* Booking dashboard */
import React, { Component } from "react";
import { Form, Col, Button, Row, Alert, Container } from "react-bootstrap";
import CarServiceApi from "../api/CarServiceApi";
import BookingServiceApi from "../api/BookingServiceApi";
import UserServiceApi from "../api/UserServiceApi";

class SearchTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      startTime: "",
      errorMessage: "",
      availableCars: [],
      successMessage:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // check for available cars and redirect
    let newSearch = {
      from: this.state.from,
      to: this.state.to,
      startTime: this.state.startTime,
    };
    // publish search all available cars request to backend
    CarServiceApi.searchAvailableCars(newSearch)
      .then(async (res) => {
        // Iterate through each car in the response
        const searchStartTime = new Date(this.state.startTime);
        const currentTime = new Date();
        const carsWithPhoneNumber = await Promise.all(
          res.data.cars.map(async (car) => {
            try {
              // Retrieve user's phone number using userId
              const userResponse = await UserServiceApi.getUserFromId(car.user);
              const carTripStartTime = new Date(car.startTime);
              if (searchStartTime <= currentTime) {
                // Exclude car if trip startTime is before current time
                alert("Please Select a Future date");
                return null;
              }
              car.startTime = car.startTime.toLocaleString().replace("T", " ");
              if (carTripStartTime.getTime() >= searchStartTime.getTime()) {
                return { ...car, phoneNumber: userResponse.data.user.phone };
              } else {
                return null;
              }
              // Update car object with phone number
            } catch (error) {
              console.error("Error fetching user details:", error);
              // Return car without phone number if an error occurs
              return { ...car, phoneNumber: "N/A" };
            }
          })
        );

        const filteredCars = carsWithPhoneNumber.filter((car) => car !== null);
        // Set state with updated list of cars
        this.setState({
          availableCars: filteredCars,
          noAvailableCars: filteredCars.length === 0,
          errorMessage: "",
        });
        
      })
      .catch((error) => {
        // display error if there's any
        this.setState({
          errorMessage: error.response.data.message,
          availableCars: [],
          noAvailableCars: true,
        });
      });
  };

  handleBooking = async (carUserId, carId) => {
    // check for available cars and redirect
    let newBook = {
      bookedBy: UserServiceApi.getLoggedInUserID(),
      createdBy: carUserId,
      tripId: carId,
      bookingTime: new Date().toLocaleString(),
    };

    BookingServiceApi.createBooking(newBook)
      .then(() => {
        this.setState({ successMessage: "Trip Booked Successfully" });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  getUserPhoneNumber = (userId) => {
    try {
      console.log(userId);
      const response = UserServiceApi.getUserFromId(userId);
      console.log(response);
      console.log(response.user.phone);
      return response.data.user.phone;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return "N/A";
    }
  };


  render() {
    const { errorMessage, availableCars } = this.state;

    return (
      <Container>
        <h2>Enter the details for Search the trip.</h2>
        {this.state.errorMessage && (
          <Alert variant="danger">
            <Alert.Heading>Error checking availability!</Alert.Heading>
            <p>{this.state.errorMessage}</p>
          </Alert>
        )}
        {this.state.successMessage && (
          <Alert variant="success">
            <Alert.Heading>Success</Alert.Heading>
            <p>{this.state.successMessage}</p>
          </Alert>
        )}
        <Form onSubmit={this.handleSubmit} id="availability_form">
          <Form.Group as={Row} controlId="formHorizontalFirstName">
            <Form.Label column sm={2}>
              From
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="from"
                type="input"
                onChange={this.handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              To
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="to"
                type="input"
                onChange={this.handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              Start Time
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="startTime"
                type="datetime-local"
                onChange={this.handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit Details</Button>
            </Col>
          </Form.Group>
        </Form>
        {errorMessage && <p>{errorMessage}</p>}

        {this.state.noAvailableCars ? (
          <p>No available cars found</p>
        ) : (
          <div>
            <h2>Available Cars</h2>
            <h5>Please Fill the details to show cars.</h5>
            <ul>
              {availableCars.map((car) => (
                <li key={car._id} style={{ borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '18px' }}>
                    • {car.from} - {car.to}
                    </h3>
                    <p style={{ fontSize: '16px', margin: '5px 0', textAlign: 'left' }}>Start Time: {car.startTime}</p>
                    <p style={{ fontSize: '16px', margin: '5px 0', textAlign: 'left' }}>Vehicle No: {car.vehicleNo}</p>
                    <p style={{ fontSize: '16px', margin: '5px 0' }}>User Phone Number: {car.phoneNumber}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '16px', margin: '5px 0' }}>Cost: ₹ {car.cost}</p>
                    <Button style={{ marginTop: '10px' }} onClick={() => this.handleBooking(car.user, car._id)}>
                      Book Car
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>


        )}
      </Container>
    );
  }
}

export default SearchTrip;
