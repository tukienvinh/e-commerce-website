import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get, put } from "../../httpHelper";
import './EditCategory.css';

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.fetchCategoryById = this.fetchCategoryById.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    };

    state = {
        name: "",
        description: "",
        category: [],
        errors: {}
    };

    componentDidMount() {
        this.fetchCategoryById();
    }

    validateField() {
        var isValid = true;
        var errors = {};

        if (this.state.name === "") {
            isValid = false;
            errors["name"] = "Please enter category name";
        }

        if (this.state.description === "") {
            isValid = false;
            errors["description"] = "Please enter category description";
        }

        this.setState({
            errors
        });

        return isValid;
    };

    fetchCategoryById() {
        get(`/api/categories/category/${this.props.match.params.categoryId}`).then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              this.setState({ category: response.data });
            }
          }).catch((error => {
              console.log(error.message);
          }));
    };

    handleFormSubmit(e) {
        e.preventDefault();
        if(this.validateField()) {
            put(`/api/categories/category`, {
                id: this.props.match.params.categoryId,
                name: this.state.name,
                description: this.state.description

            }).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    window.location.href = "/edit/categories";
                    alert("Edit category successfully.");
                }

            }).catch((error) => {
                alert(error.response.data.message);
            });
        }
    };

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    }

    render() {
        return (
            <div id="edit_category_form">
                <h2>Edit category</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="name_group">
                        <Label for="category_name">Category Name</Label>
                        <Input
                        type="text"
                        name="category_name"
                        id="category_name"
                        placeholder={this.state.category.name}
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
                        placeholder={this.state.category.description}
                        onChange={(e) => this.handleFieldChange(e, "description")}
                        />
                        <div className="text-danger">{this.state.errors.description}</div>
                    </FormGroup>
                    <Button id="button">Edit category</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(EditCategory);