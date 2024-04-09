/* View all locations page */
import React, { Component } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import LocationServiceApi from '../../api/LocationServiceApi';
import UserServiceApi from '../../api/UserServiceApi';

export default class ViewAllLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            errorMessage: ''
        };
    }

    componentDidMount() {
        // get all locations
        LocationServiceApi.getAllLocations().then(async (res) => {
            const userPromises = res.data.locations.map(async (location) => {
                try {
                  // Fetch user details for bookedBy and createdBy
                  const createdByResponse = await UserServiceApi.getUserFromId(location.user);

                  return {
                    ...location,
                    createdByName: createdByResponse.data.user.firstname + " " + createdByResponse.data.user.lastname,
                  };
                } catch (error) {
                  console.error("Error fetching user details:", error);
                  // Return booking without user names if an error occurs
                  return {
                    ...location,
                    bookedByName: "N/A",
                    createdByName: "N/A"
                  };
                }
              });
      
              // Wait for all user detail promises to resolve
              const locationsWithUserDetails = await Promise.all(userPromises);
      
              this.setState({
                locations: locationsWithUserDetails,
                errorMessage: "",
              });
      
              console.log(this.state.bookings);
              console.log(res.data.bookings);
        }).catch(error => {
            this.setState({
                errorMessage: error.response
            });
        });
    }

    render() {
        return (
            <Container>
                <h2>All trips</h2>
                {this.state.errorMessage && <Alert variant="danger">
                    <Alert.Heading>Error Getting all cars!</Alert.Heading>
                    <p>
                        {this.state.errorMessage}
                    </p>
                </Alert>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Created By</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Start Time</th>
                            <th>Vehicle No</th>
                            <th>Cost</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.locations.map(location =>
                                <tr style={{ 'cursor': 'pointer' }} key={location._id}>
                                    <td>{location._id}</td>
                                    <td>{location.createdByName}</td>
                                    <td>{location.from}</td>
                                    <td>{location.to}</td>
                                    <td>{location.startTime}</td>
                                    <td>{location.vehicleNo}</td>
                                    <td>₹ {location.cost}</td>
                                    <td><Button href={`/admin/modify/location/${location._id}`}>Modify</Button></td>
                                    <td><Button href={`/admin/view/location/${location._id}`}>View</Button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}
