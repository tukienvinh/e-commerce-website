import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { post } from "../../httpHelper";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignUp.css'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        redirect: false,
        errors: {}
    };
    
    validateField() {
        var isValid = true;
        var errors = {};
        if (this.state.name.trim().length === 0) {
            isValid = false;
            errors["name"] = "Please enter your name";
        }

        if (this.state.email.trim().length === 0) {
            isValid = false;
            errors["email"] = "Please enter your email address";
        }

        if (/\s/.test(this.state.email)) {
            isValid = false;
            errors["email"] = "Email can't contain blank";
        }

        if (this.state.username.trim().length === 0) {
            isValid = false;
            errors["username"] = "Please enter your username";
        }

        if (/\s/.test(this.state.username)) {
            isValid = false;
            errors["username"] = "Username can't contain blank";
        }

        if (this.state.username.trim().length < 3) {
            isValid = false;
            errors["username"] = "Username must contain at least 3 characters";
        }

        if (this.state.password.trim().length === 0) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
        
        if (/\s/.test(this.state.password)) {
            isValid = false;
            errors["password"] = "Password can't contain blank";
        }

        if (this.state.password.trim().length < 6) {
            isValid = false;
            errors["password"] = "Password must contain at least 6 characters";
        }

        if (this.state.confirm_password.trim().length === 0) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
        }
    
        if (this.state.password !== this.state.confirm_password) {
            isValid = false;
            errors["confirm_password"] = "Confirm password does not match.";
        }

        this.setState({
            errors
        });

        return isValid;
    };

    handleFormSubmit(e) {
        e.preventDefault();
        if(this.validateField()) {
            post(`/api/auth/signup`, {
                name: this.state.name.trim(),
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
    
              }).then((response) => {
                console.log(response.data);
                this.setState({redirect: true});
    
              }).catch((error) => {
                  alert(error.response.data.message);
              });
        }
    }

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    }

    render() {
        if (this.state.redirect === true)
            return <Redirect to ={{ pathname:"/signin"}}/>
        return (
            <div id="signin_form">
                <h2>Sign Up</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="name_group">
                        <Label for="name">Name</Label>
                        <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        onChange={(e) => this.handleFieldChange(e, "name")}
                        />
                        <div className="text-danger">{this.state.errors.name}</div>
                    </FormGroup>
                    <FormGroup id="username_group">
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => this.handleFieldChange(e, "username")}
                        />
                        <div className="text-danger">{this.state.errors.username}</div>
                    </FormGroup>
                    <FormGroup id="email_group">
                        <Label for="email">Email</Label>
                        <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => this.handleFieldChange(e, "email")}
                        />
                        <div className="text-danger">{this.state.errors.email}</div>
                    </FormGroup>
                    <FormGroup id="password_group">
                        <Label for="password">Password</Label>
                        <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        onChange={(e) => this.handleFieldChange(e, "password")}
                        />
                        <div className="text-danger">{this.state.errors.password}</div>
                    </FormGroup>
                    <FormGroup id="confirm_password_group">
                        <Label for="confirm_password">Confirm Password</Label>
                        <Input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="********"
                        onChange={(e) => this.handleFieldChange(e, "confirm_password")}
                        />
                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </FormGroup>
                    <Button id="button">Sign up</Button>
                    <div id="signin">
                        <Link to ="/signin">
                            Already have an account?
                        </Link>
                    </div>
                </Form>
            </div>
        )
    }
}
