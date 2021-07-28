import React, { Component } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { get } from "../../httpHelper";
import './ShoppingCart.css';
import { Button } from 'reactstrap';

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.fetchProductList = this.fetchProductList.bind(this);
        this.handleIncreaseStock = this.handleIncreaseStock.bind(this);
        this.handleDecreaseStock = this.handleDecreaseStock.bind(this);
    };

    state = {
        productList: [],
        totalPrice: 0
    };

    componentDidMount() {
        this.fetchProductList();
    };

    fetchProductList() {
        get("/api/products").then((response) => {
            if (response.status === 200) {
                response.data.sort(function(a, b) { 
                    return a.id - b.id  ||  a.name.localeCompare(b.name);
                });

                var cartItem = JSON.parse(localStorage.getItem("cart"));
                var shoppingCart = [];
                var totalPrice = 0;
                if (cartItem !== null) {
                    for (var i = 0; i < cartItem.length; i++) {
                        if (response.data.find(item => item.name === cartItem[i].name) !== undefined) {
                            var item = response.data.find(item => item.name === cartItem[i].name);
                            shoppingCart.push({
                                name: item.name,
                                author: item.author,
                                price: item.price,
                                stock: cartItem[i].stock,
                                image: item.image
                            });
                            totalPrice += cartItem[i].stock * response.data.find(item => item.name === cartItem[i].name).price;
                        }
                    }
                };
                localStorage.setItem("cart", JSON.stringify(shoppingCart));
                this.setState({
                    productList: shoppingCart,
                    totalPrice 
                });
                this.setState({ isLoading: false });
            }
        })
    };

    handleIncreaseStock(product) {
        var shoppingCart = JSON.parse(localStorage.getItem("cart"));
        shoppingCart.find(item => item.name === product.name).stock += 1;
        localStorage.setItem("cart", JSON.stringify(shoppingCart));
        this.setState({ 
            productList: shoppingCart,
            totalPrice: this.state.totalPrice + product.price
        });
    }

    handleDecreaseStock(product) {
        var shoppingCart = JSON.parse(localStorage.getItem("cart"));
        if (shoppingCart.find(item => item.name === product.name).stock === 1) {
            var index = shoppingCart.indexOf(shoppingCart.find(item => item.name === product.name));
            shoppingCart.splice(index, 1);
        }
        else {
            shoppingCart.find(item => item.name === product.name).stock -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(shoppingCart));
        this.setState({ 
            productList: shoppingCart,
            totalPrice: this.state.totalPrice - product.price
        });

    }

    render() {
        return (
            <div>
                <h1>Shopping Cart</h1>
                {this.state.productList.length === 0 && (
                    <h2>Your Shopping Cart Is Empty.</h2>
                )}
                {this.state.productList.length !== 0 && (
                    <div>
                        <table id="table">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Image</th>
                            <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.author}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Button onClick={() => this.handleIncreaseStock(product)}><FaPlus/></Button> 
                                    {product.stock} 
                                    <Button onClick={() => this.handleDecreaseStock(product)}><FaMinus/></Button></td>
                                <td>
                                    <img
                                        src={`data:image/jpeg;base64,${product.image}`}
                                        id="item-image"
                                        alt="img"
                                    />
                                </td>
                                <td>{product.price*product.stock}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        <h2>Total Price: {this.state.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h2>
                    </div>
                )}
            </div>
        )
    }
}
