import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { post } from "../../httpHelper";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignIn.css'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    state = {
        username: "",
        password: "",
    };
    
    handleFormSubmit(e) {
        e.preventDefault();
        post(`/api/auth/signin`, {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("address", response.data.address);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.roles);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("loggedIn", true);
            console.log(localStorage.getItem("token"));
            this.props.onSignIn(e);
        }).catch((error) => {
              alert(error.response.data.message);
        });
        
    }

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    }

    render() {
        if (localStorage.getItem("loggedIn"))
            return <Redirect to ={{ pathname:"/"}}/>
        return (
            <div id="signin_form">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="username_group">
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        name="username"
                        id="username"
                        value={this.state.firstName}
                        placeholder="Username"
                        onChange={(e) => this.handleFieldChange(e, "username")}
                        />
                    </FormGroup>
                    <FormGroup id="password_group">
                        <Label for="password">Password</Label>
                        <Input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.firstName}
                        placeholder="********"
                        onChange={(e) => this.handleFieldChange(e, "password")}
                        />
                    </FormGroup>
                    <Button id="button">Sign in</Button>
                    <div id="signup">
                        <Link to ="/signup">
                            Not have an account yet?
                        </Link>
                    </div>
                </Form>
            </div>
        )
    }
}
