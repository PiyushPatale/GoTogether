/* Booking dashboard */
import React, { Component } from "react";
import { Form, Col, Button, Row, Alert, Container } from "react-bootstrap";
import LocationServiceApi from "../api/LocationServiceApi";
import UserServiceApi from "../api/UserServiceApi";

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      startTime: "",
      endTime: "",
      vehicleNo: "",
      kilometers: "",
      suggestedCost: 0,
      cost: "",
      successMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  kilohandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      if (name === "kilometers") {
        const suggestedCost = parseInt(value) * 11;
        this.setState({ suggestedCost });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let newSearch = {
      user: UserServiceApi.getLoggedInUserID(),
      from: this.state.from,
      to: this.state.to,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      vehicleNo: this.state.vehicleNo,
      cost: this.state.cost,
    };

    LocationServiceApi.createNewLocation(newSearch)
      .then(() => {
        this.setState({ successMessage: "Trip Created Successfully" });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    return (
      <Container>
        <h2>Enter the details for creating the trip.</h2>
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

          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              Expected End Time
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="endTime"
                type="datetime-local"
                onChange={this.handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              Vehicle Number
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="vehicleNo"
                type="input"
                onChange={this.handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              Kilometers
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                name="kilometers"
                type="input"
                onChange={this.kilohandleChange}
                required
              />
            </Col>
            <div
              className="km-label"
              style={{
                display: "flex",
                marginLeft: "-20px",
                fontSize: "18px",
                alignItems: "flex-end",
              }}
            >
              <Col sm={12}>km</Col>
            </div>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              Suggested Cost
            </Form.Label>
            <div
              className="km-label"
              style={{
                display: "flex",
                fontSize: "18px",
                alignItems: "center",
              }}
            >
              <Col sm={12}>₹ {this.state.suggestedCost}</Col>
            </div>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalLastName">
            <Form.Label column sm={2}>
              Cost
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="cost"
                type="input"
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
      </Container>
    );
  }
}

export default CreateTrip;
