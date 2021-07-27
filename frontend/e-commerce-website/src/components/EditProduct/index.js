import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get, put } from "../../httpHelper";
import './EditProduct.css';
import FileBase64 from 'react-file-base64';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.fetchCategoryList = this.fetchCategoryList.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    state = {
        categoryList: [],
        errors: {},
        name: "",
        category_id: "",
        category_name: "",
        author: "",
        description: "",
        price: 0,
        stock: 0,
        image: ""
    };

    componentDidMount() {
        this.fetchCategoryList();
        this.fetchProductById();
    };

    validateField() {
        var isValid = true;
        var errors = {};

        if (this.state.name.trim().length === 0) {
            isValid = false;
            errors["name"] = "Please enter your product name";
        }

        if (this.state.author.trim().length === 0) {
            isValid = false;
            errors["author"] = "Please enter product's author";
        }

        if (this.state.description.trim().length === 0) {
            isValid = false;
            errors["description"] = "Please enter your product description";
        }

        if (this.state.image === "") {
            isValid = false;
            errors["image"] = "Please upload your product image";
        }

        this.setState({
            errors
        });
        return isValid;
    };

    fetchCategoryList() {
        get(`/api/categories`).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                this.setState({ 
                    categoryList: response.data
                });
            }
        })
    };

    fetchProductById() {
        get(`/api/products/product/${this.props.match.params.productId}`).then((response) => {
            if (response.status === 200) {
                this.setState({
                    name: response.data.name,
                    category_id: response.data.category.id,
                    category_name: response.data.category.name,
                    author: response.data.author,
                    description: response.data.description,
                    price: response.data.price,
                    stock: response.data.stock,
                    image: response.data.image
                });
            }
        }).catch((error => {
            confirmAlert({
                title: 'Error',
                message: error.response.data.message,
                buttons: [
                  {
                    label: 'Ok'
                  },
                ]
            });
        }));
    };

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.validateField()) {
            put(`/api/products/product`, {
                id: this.props.match.params.productId,
                name: this.state.name,
                category: {
                    id: this.state.category_id
                },
                author: this.state.author,
                description: this.state.description,
                price: this.state.price,
                stock: this.state.stock,
                image: this.state.image
            }).then((response) => {
                if (response.status === 200) {
                    alert(response.data.message);
                    window.location.href = "/manage/products";
                }
            }).catch((error) => {
                confirmAlert({
                    title: 'Error',
                    message: error.response.data.message,
                    buttons: [
                      {
                        label: 'Ok'
                      },
                    ]
                });
            });
        }
        
    }

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    };

    getFiles(files){
        this.setState({ image: files[0].base64.replace('data:image/jpeg;base64,', "") });
      }

    render() {
        return (
            <div id="edit_product_form">
                <h2>Edit product</h2>
                <Form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormGroup id="name_group">
                        <Label for="name">Product Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Product Name"
                            value={this.state.name}
                            onChange={(e) => this.handleFieldChange(e, "name")}
                            required
                        />
                        <div className="text-danger">{this.state.errors.name}</div>
                    </FormGroup>
                    <FormGroup id="category_group">
                        <Label for="category">Category</Label>
                        <Input type="select" name="category" id="category" required onChange={(e) => this.handleFieldChange(e, "category_id")}>
                            {this.state.categoryList.map((category) => (
                                this.state.category_id === category.id ? (
                                    <option value={this.state.category_id} selected>{this.state.category_name}</option>
                                ) : (
                                    <option value={category.id}>{category.name}</option>
                                )
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup id="author_group">
                        <Label for="author">Author</Label>
                        <Input
                            type="text"
                            name="author"
                            id="author"
                            placeholder="Author"
                            value={this.state.author}
                            onChange={(e) => this.handleFieldChange(e, "author")}
                            required
                        />
                        <div className="text-danger">{this.state.errors.author}</div>
                    </FormGroup>
                    <FormGroup id="description_group">
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={(e) => this.handleFieldChange(e, "description")}
                            required
                        />
                        <div className="text-danger">{this.state.errors.description}</div>
                    </FormGroup>
                    <FormGroup id="price_group">
                        <Label for="price">Price</Label>
                        <Input
                            type="number"
                            min="10000"
                            step="1000"
                            name="price"
                            id="price"
                            placeholder="Price"
                            value={this.state.price}
                            onChange={(e) => this.handleFieldChange(e, "price")}
                            required
                        />
                    </FormGroup>
                    <FormGroup id="stock_group">
                        <Label for="stock">Stock</Label>
                        <Input
                            type="number"
                            min="1"
                            step="1"
                            value={this.state.stock}
                            name="stock"
                            id="stock"
                            placeholder="Stock"
                            onChange={(e) => this.handleFieldChange(e, "stock")}
                            required
                        />
                    </FormGroup>
                    <FormGroup id="image_group">
                        <Label for="image">Image</Label>
                        <FileBase64
                            multiple={ true }
                            onDone={ this.getFiles.bind(this) }
                        />
                        <img 
                            src={`data:image/jpeg;base64,${this.state.image}`} 
                            alt="img"
                            id = "preview-img"
                        />
                        <div className="text-danger">{this.state.errors.image}</div>
                    </FormGroup>
                    <Button id="button">Edit product</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(EditProduct);