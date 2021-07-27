import React, { Component } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { get, del } from "../../httpHelper";
import { Button } from 'reactstrap';
import './ManageProducts.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.fetchProductList = this.fetchProductList.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    };
    
    state = {
        productList: []
    };

    componentDidMount() {
        this.fetchProductList();
    }
    
    fetchProductList() {
        get("/api/products").then((response) => {
            if (response.status === 200) {
                response.data.sort(function(a, b) { 
                    return a.id - b.id  ||  a.name.localeCompare(b.name);
                });
                this.setState({ productList: response.data });
            }
        }).catch((error => {
            console.log(error.response.data.message);
        }));
    };

    deleteProduct(id) {
        confirmAlert({
            title: 'Alert',
            message: "Confirm to delete this product?",
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    var product = this.state.productList.find(product => product.id === id);
                    if (product.num_rating === 0) {
                        del(`/api/products/product/${id}`).then((response) => {
                            if (response.status === 200) {
                                window.location.href = "/manage/products";
                            }
                        }).catch((error => {
                            confirmAlert({
                                title: 'Error',
                                message: error.response.data.message,
                                buttons: [
                                    {
                                        label: 'Ok'
                                    }
                                ]
                            })
                        }))
                    }
                }
              },
              {
                label: 'No',
              }
            ]
        });
    };

    render() {
        return (
            <div>
                <h1>Manage Products</h1>
                <Button href="/manage/products/add" id="add_product_button">Add new product <FaPlus/></Button>
                <table id="table">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Rating</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.productList.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                        <td>{product.author}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                            <img
                                src={`data:image/jpeg;base64,${product.image}`}
                                id="item-image"
                                alt="img"
                            />
                        </td>
                        <td>{product.rating}</td>
                        <td><Button onClick={() => this.deleteProduct(product.id) }><FaTrash/></Button></td>
                        <td><Button href={`/manage/products/edit/${product.id}`}><FaEdit/></Button></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }
}
