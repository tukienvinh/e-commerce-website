import React, { Component } from 'react';
import { put } from "../../httpHelper";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditProfile.css';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    state = {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        address: localStorage.getItem("address"),
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
            errors["email"] = "Please enter your email";
        }

        if (/\s/.test(this.state.email)) {
            isValid = false;
            errors["email"] = "Email can't contain blank";
        }

        if (this.state.address.trim().length === 0 || this.state.address === "null") {
            isValid = false;
            errors["address"] = "Please enter your address.";
        }

        this.setState({
            errors
        });

        return isValid;
    };

    handleFormSubmit(e) {
        e.preventDefault();
        if(this.validateField()) {
            put(`/api/users/edit/profile`, {
                name: this.state.name,
                email: this.state.email,
                address: this.state.address
              }).then((response) => {
                  if (response.status === 200) {
                    localStorage.setItem("name", this.state.name);
                    localStorage.setItem("email", this.state.email);
                    localStorage.setItem("address", this.state.address);
                    confirmAlert({
                        title: 'Notification',
                        message: 'Update profile successfully.',
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
                <h2>Edit Profile</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="name_group">
                        <Label for="name">Name</Label>
                        <Input
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.name}
                        placeholder="Your name"
                        onChange={(e) => this.handleFieldChange(e, "name")}
                        />
                        <div className="text-danger">{this.state.errors.name}</div>
                    </FormGroup>
                    <FormGroup id="email_group">
                        <Label for="email">Email</Label>
                        <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(e) => this.handleFieldChange(e, "email")}
                        />
                        <div className="text-danger">{this.state.errors.email}</div>
                    </FormGroup>
                    <FormGroup id="address_group">
                        <Label for="address">Address</Label>
                        <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={this.state.address}
                        onChange={(e) => this.handleFieldChange(e, "address")}
                        />
                        <div className="text-danger">{this.state.errors.address}</div>
                    </FormGroup>
                    <Button id="button">Edit Profile</Button>
                </Form>
            </div>
        )
    }
}
