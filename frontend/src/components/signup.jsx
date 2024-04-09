/* Signup page */
import React, { Component } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import UserServiceApi from '../api/UserServiceApi.js';
import "../styles/signUp.css"

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            errorMessage: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /* Set react state for each input when user inputs something on signup form */
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        /* create new user object */
        let newUser = {
            firstname: this.state.firstname.trim(),
            lastname: this.state.lastname.trim(),
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            usertype: "customer"
        };
        // input validation
        if (this.state.firstname === '') {
            return this.setState({ errorMessage: "First name can't be empty!" });
        }
        if (this.state.lastname === '') {
            return this.setState({ errorMessage: "Last name can't be empty!" });
        }
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(String(this.state.email).toLowerCase())) {
            return this.setState({ errorMessage: "Please enter a valid email!" });
        }
        const phoneRegex = /[2-9]{2}\d{8}/;
        if (!phoneRegex.test(String(this.state.phone))) {
            return this.setState({ errorMessage: "Please enter a valid phone number!" });
        }
        console.log(this.state.phone);
        // publish new user to backend
        UserServiceApi.createNewUser(newUser).then(() => {
            // login user on success
            UserServiceApi.loginUser({ email: this.state.email, password: this.state.password }).then(res => {
                UserServiceApi.registerSuccessfulLoginForJwt(res.data.token);
                window.location.href = `/`;
            })
        }).catch((error) => {
            this.setState({ errorMessage: error.response.data.message });
        });
    }

    render() {
        return (
            <>
                <div style={{ display: 'flex' , backgroundColor:'#E9FBFB' }}>
                        <div className='lottie'>                            
                            <dotlottie-player src="https://lottie.host/21188a79-b5b6-46d6-b553-8cb85d40b830/IDIqEfyBHe.json" background="transparent" speed="1" loop autoplay style={{ width: "750px", height: "auto", marginTop: "-90px", marginLeft:'80px' }}></dotlottie-player>
                        </div>
                    <div style={{ width: '50vw', height: '92vh', marginLeft:'-80px' }}>
                        <div style={{ marginLeft: '20px', paddingLeft: '0px' }} >
                            {this.state.errorMessage && <Alert variant="danger">
                                <Alert.Heading>Sign up failed!</Alert.Heading>
                                <p>
                                    {this.state.errorMessage}
                                </p>
                            </Alert>}
                            <h1 style={{ textAlign: "center", paddingTop: '50px', color:'black' }}>SIGN UP</h1>
                            <Form style={{ marginTop: '15px', fontSize: '20px' }} onSubmit={this.handleSubmit} id="signup_form" >
                                <Form.Group controlId="formHorizontalFirstName">
                                    <div style={{ marginLeft: '180px' }}>

                                        <Form.Label row sm={2}>
                                            First Name
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control name="firstname" type="firstname" placeholder="First Name" onChange={this.handleChange} required />
                                        </Col>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formHorizontalLastName">
                                    <div style={{ marginLeft: '180px', marginTop: '10px' }}>

                                        <Form.Label row sm={2}>
                                            Last Name
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control name="lastname" type="lastname" placeholder="Last Name" onChange={this.handleChange} required />
                                        </Col>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formHorizontalEmail">
                                    <div style={{ marginLeft: '180px', marginTop: '10px' }}>

                                        <Form.Label row sm={2}>
                                            Email
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control name="email" type="email" placeholder="Email" onChange={this.handleChange} required />
                                        </Col>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formHorizontalPassword">
                                    <div style={{ marginLeft: '180px', marginTop: '10px' }}>

                                        <Form.Label row sm={2}>
                                            Password
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control name="password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain: at least one number, one uppercase, lowercase letter, and at least 8 or more characters" placeholder="Password" onChange={this.handleChange} required />
                                        </Col>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formHorizontalPhone">
                                    <div style={{ marginLeft: '180px', marginTop: '10px' }}>

                                        <Form.Label row sm={2}>
                                            Phone Number
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control name="phone" type="phone" pattern="[1-9]{1}[0-9]{9}" title="Must contain 10 digits" placeholder="Phone Number" onChange={this.handleChange} required />
                                        </Col>
                                    </div>
                                </Form.Group>

                                <Form.Group>
                                    <div style={{ marginTop: '15px' }}>
                                        <Col sm={{ span: 5, offset: 5 }}>
                                            <Button style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: "green" }} type="submit">Create Account</Button>
                                        </Col>
                                    </div>
                                    <div style={{ marginTop: '5px', marginLeft: '260px' }}>
                                        <Col sm={{ span: 7 }}>
                                            <a href="/login">Already Have an account?</a>
                                        </Col>
                                    </div>
                                </Form.Group>
                            </Form>

                        </div>
                    </div>
                </div>
                <div style={{width:"100%", backgroundColor:"#173658", height:"63px",marginTop:"-58px"}}></div>
            </>
        )
    }
}

export default SignUpPage;
