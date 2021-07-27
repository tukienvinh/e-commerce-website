import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { post } from "../../httpHelper";
import './AddCategory.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    state = {
        name: "",
        description: "",
        errors: {}
    };

    validateField() {
        var isValid = true;
        var errors = {};

        if (this.state.name.trim().length === 0) {
            isValid = false;
            errors["name"] = "Please enter your category name.";
        }

        if (this.state.description.trim().length === 0) {
            isValid = false;
            errors["description"] = "Please enter your category description.";
        }

        this.setState({
            errors
        });

        return isValid;
    };

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.description);
        if (this.validateField()) {
            post(`/api/categories/category`, {
                name: this.state.name.trim(),
                description: this.state.description.trim()
            }).then((response) => {
                if (response.status === 200) {
                    confirmAlert({
                        title: 'Notification',
                        message: response.data.message,
                        buttons: [
                          {
                            label: 'Ok',
                            onClick: () => window.location.href = "/edit/categories"
                          }
                        ]
                    });
                }
            }).catch((error) => {
                confirmAlert({
                    title: 'Error',
                    message: error.response.data.message,
                    buttons: [
                        {
                        label: 'Ok',
                        }
                    ]
                });
            });
        }
    };

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    };

    render() {
        return (
            <div id="add_category_form">
                <h2>Add new category</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="name_group">
                        <Label for="category_name">Category Name</Label>
                        <Input
                        type="text"
                        name="category_name"
                        id="category_name"
                        placeholder="Category Name"
                        onChange={(e) => this.handleFieldChange(e, "name")}
                        />
                        <div className="text-danger">{this.state.errors.name}</div>
                    </FormGroup>
                    <FormGroup id="description_group">
                        <Label for="description">Description</Label>
                        <Input
                        type="description"
                        name="description"
                        id="description"
                        placeholder="Description"
                        onChange={(e) => this.handleFieldChange(e, "description")}
                        />
                        <div className="text-danger">{this.state.errors.description}</div>
                    </FormGroup>
                    <Button id="button">Add new category</Button>
                </Form>
            </div>
        )
    }
}
