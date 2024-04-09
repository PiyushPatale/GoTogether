/* login page */
import React, { Component } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import UserServiceApi from "../api/UserServiceApi.js";
import Spinner from "./Spinner.jsx";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let creds = {
      email: this.state.email,
      password: this.state.password,
    };
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(this.state.email).toLowerCase())) {
      return this.setState({ errorMessage: "Please enter a valid email!" });
    }
    UserServiceApi.loginUser(creds)
      .then((res) => {
        UserServiceApi.registerSuccessfulLoginForJwt(res.data.token);
        window.location.href = `/`;
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div style={{ display: "flex", backgroundColor: "#E9FBFB" }}>
              <div style={{ width: "50vw", height: "92vh" }}>
                <div style={{ marginLeft: "20px", paddingLeft: "0px" }}>
                  {this.state.errorMessage && (
                    <Alert variant="danger">
                      <Alert.Heading>Login failed!</Alert.Heading>
                      <p>{this.state.errorMessage}</p>
                    </Alert>
                  )}
                  <h1
                    className="h1"
                    style={{ textAlign: "center", color: "black" }}
                  >
                    LOG IN
                  </h1>
                  <Form
                    style={{ marginTop: "35px", fontSize: "20px" }}
                    onSubmit={this.handleSubmit}
                    id="login_form"
                  >
                    <Form.Group controlId="formHorizontalEmail">
                      <div style={{ marginLeft: "180px" }}>
                        <Form.Label row sm={2}>
                          Email
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <div style={{ marginLeft: "180px", marginTop: "30px" }}>
                        <Form.Label row sm={2}>
                          Password
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            name="password"
                            type="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain: at least one number, one uppercase, lowercase letter, and at least 8 or more characters"
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </div>
                    </Form.Group>

                    <Form.Group>
                      <div style={{ marginTop: "25px" }}>
                        <Col sm={{ span: 5, offset: 5 }}>
                          <Button
                            style={{
                              paddingLeft: "30px",
                              paddingRight: "30px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              backgroundColor: "green",
                            }}
                            type="submit"
                          >
                            Login
                          </Button>
                        </Col>
                      </div>
                      <div style={{ marginTop: "5px", marginLeft: "255px" }}>
                        <Col sm={{ span: 7 }}>
                          <a href="/signup">Don't Have an account?</a>
                        </Col>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </div>
              <div className="lottie">
                <dotlottie-player
                  src="https://lottie.host/21188a79-b5b6-46d6-b553-8cb85d40b830/IDIqEfyBHe.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  style={{
                    width: "750px",
                    height: "auto",
                    marginTop: "-150px",
                  }}
                ></dotlottie-player>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "#173658",
                height: "124px",
                marginTop: "-118px",
              }}
            ></div>
          </>
        )}
      </>
    );
  }
}

export default LoginPage;
