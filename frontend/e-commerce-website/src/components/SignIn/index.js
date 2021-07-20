import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignIn.css'

export default class index extends Component {
    render() {
        return (
            <div id="signin_form">
                <h2>Sign In</h2>
                <Form className="form">
                    <FormGroup id="username_group">
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
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
