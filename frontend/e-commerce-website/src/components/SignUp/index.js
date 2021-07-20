import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignUp.css'

export default class index extends Component {
    render() {
        return (
            <div id="signin_form">
                <h2>Sign Up</h2>
                <Form className="form">
                    <FormGroup id="name_group">
                        <Label for="name">Name</Label>
                        <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        />
                    </FormGroup>
                    <FormGroup id="username_group">
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup id="email_group">
                        <Label for="email">Email</Label>
                        <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        />
                    </FormGroup>
                    <FormGroup id="password_group">
                        <Label for="password">Password</Label>
                        <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
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
