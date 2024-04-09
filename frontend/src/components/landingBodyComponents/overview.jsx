/* Overview component in landing page */
import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faCar, faUsers, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import '../../styles/overview.css';

export default class Overview extends Component {
    render() {
        return (
            <section className="section-item">
                <div>
                    <h2>Overview</h2>
                    <Container fluid style={{ marginTop: '3vh' }}>
                        <Row>
                            <Col>
                                <div className="how-it-works">
                                    <h3>Sign up</h3>
                                    <p>Simply Sign up for free and Log in to our application</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="how-it-works">
                                    <h3>Create Trip</h3>
                                    <p>Add the details of your trip and wait for a companion to book your trip</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="how-it-works">
                                    <h3>Search Trip</h3>
                                    <p>Look for a ride with someone having the same destination as you</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="how-it-works">
                                    <h3>Dashboard</h3>
                                    <p>Keep track of your previous and next trips</p>
                                </div>
                            </Col>
                        </Row>
                        <div className="benefits-div">
                            <h2>Benefits</h2>
                            {/* <p>
                                GoTogether gives you access to various benefits.
                            </p> */}
                            <Row>
                                <Col>
                                    <div className="benefits-white-cards">
                                        <FontAwesomeIcon icon={faPiggyBank} size="3x" />
                                        <h3>Signing Up is Free</h3>
                                        <p>Nothing to lose by joining. 100% Free!</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="benefits-white-cards">
                                        <FontAwesomeIcon icon={faMoneyBill} size="3x" />
                                        <h3>No Membership Fee</h3>
                                        <p>You only pay the trip provider</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="benefits-white-cards">
                                        <FontAwesomeIcon icon={faCar} size="3x" />
                                        <h3>Convenient than driving your own car</h3>
                                        <p>Much more ecomonic and hassle-free</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="benefits-white-cards">
                                        <FontAwesomeIcon icon={faUsers} size="3x" />
                                        <h3>Ride Companion</h3>
                                        <p>Make new friends through your journey</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                        </Row>
                    </Container>
                    <div className="find-nearest-car-div">
                        <h2>About Us</h2>
                        <p>Get to know more about us using the button below</p>
                        <div>
                            <Button href="/aboutus">Details</Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
