import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { post } from "../../httpHelper";
import './AddCategory.css';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    state = {
        name: "",
        description: ""
    };

    handleFormSubmit(e) {
        e.preventDefault();
        post(`/api/categories/category`, {
            name: this.state.name,
            description: this.state.description
        }).then((response) => {
            window.location.href = "/edit/categories";
        }).catch((error) => {
              alert("Create new category failed.");
        });
        
    }

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
                    </FormGroup>
                    <Button id="button">Add new category</Button>
                </Form>
            </div>
        )
    }
}
