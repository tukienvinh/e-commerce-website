import React, { Component } from 'react';
import { put } from "../../httpHelper";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditPassword.css';

export default class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    state = {
        newPassword: "",
        confirmPassword: "",
        errors: {}
    };
    
    validateField() {
        var isValid = true;
        var errors = {};
        if (this.state.newPassword.trim().length === 0) {
            isValid = false;
            errors["newPassword"] = "Please enter your new password";
        }

        if (this.state.newPassword.trim().length < 6) {
            isValid = false;
            errors["newPassword"] = "New password must contain at least 6 characters";
        }

        if (/\s/.test(this.state.newPassword)) {
            isValid = false;
            errors["newPassword"] = "Password can't contain blank";
        }

        if (this.state.newPassword !== this.state.confirmPassword) {
            isValid = false;
            errors["confirmPassword"] = "Confirm password does not match.";
        }

        this.setState({
            errors
        });

        return isValid;
    };

    handleFormSubmit(e) {
        e.preventDefault();
        if(this.validateField()) {
            put(`/api/users/edit/password`, {
                newPassword: this.state.newPassword,
                confirmPassword: this.state.confirmPassword,
              }).then((response) => {
                  if (response.status === 200) {
                    confirmAlert({
                        title: 'Notification',
                        message: `Now your password is ${this.state.newPassword}`,
                        buttons: [
                          {
                            label: 'Ok',
                            onClick: () => window.location.href = "/"
                          },
                        ]
                    });
                  }
              }).catch((error) => {
                    confirmAlert({
                        title: 'Error',
                        message: error.response.data.message,
                        buttons: [
                        {
                            label: 'Ok'
                        }
                        ]
                    });
                });
        }
    }

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    }

    render() {
        return (
            <div id="edit_profile_form">
                <h2>Change Password</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="password_group">
                        <Label for="name">New password</Label>
                        <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="New password"
                        onChange={(e) => this.handleFieldChange(e, "newPassword")}
                        />
                        <div className="text-danger">{this.state.errors.newPassword}</div>
                    </FormGroup>
                    <FormGroup id="confirm_password_group">
                        <Label for="confirmPassword">Confirm password</Label>
                        <Input
                        type="text"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={(e) => this.handleFieldChange(e, "confirmPassword")}
                        />
                        <div className="text-danger">{this.state.errors.confirmPassword}</div>
                    </FormGroup>
                    <Button id="button">Change Password</Button>
                </Form>
            </div>
        )
    }
}
