import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { post } from "../../httpHelper";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignUp.css'

export default class index extends Component {
    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        redirect: false
    };

    handleFormSubmit(e) {
        e.preventDefault();
        post(`/api/auth/signup`, {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password

          }).then((response) => {
            console.log(response.data);
            this.setState({redirect: true});

          }).catch((response) => {
              console.log(response);
          });
        
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
