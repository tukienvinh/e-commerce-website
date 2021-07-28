import React, { Component } from 'react'
import { get } from "../../httpHelper";
import '../Product/Product.css';
import { Button } from 'reactstrap';
import { withRouter } from "react-router";
import Rating from 'react-rating';
import { FaEye, FaShoppingCart } from 'react-icons/fa';

class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.fetchProductList = this.fetchProductList.bind(this);
        this.fetchCategory = this.fetchCategory.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    
    state = {
        productList: [],
        category: ""
    };

    
    componentDidMount() {
        this.fetchProductList();
        this.fetchCategory();
    }
      
    componentDidUpdate(prevProps) {
        if(this.props.match.params.categoryName !== prevProps.match.params.categoryName)
        {
            this.fetchProductList();
            this.fetchCategory();
        }
    } 

    fetchProductList() {
        get(`/api/categories/${this.props.match.params.categoryName}`).then((response) => {
          if (response.status === 200) {
            response.data.sort(function(a, b) { 
                return b.rating - a.rating || a.price - b.price;
            });
            this.setState({ productList: response.data });
          }
        }).catch((error => {
            alert("Get product list failed.");
        }));
    }

    fetchCategory() {
        get(`/api/categories/category/name/${this.props.match.params.categoryName}`).then((response) => {
            if (response.status === 200) {
              this.setState({ category: response.data });
            }
          }).catch((error => {
              alert("Get category failed.");
          }));
    }

    handleAddToCart(product) {
        if (localStorage.getItem("cart") === null) {
            var newItem = {
                id: product.id,
                name: product.name,
                stock: 1
            };
            var cartItem = [];
            cartItem.push(newItem);
            localStorage.setItem("cart", JSON.stringify(cartItem));
            this.setState({
                cart: cartItem
            });
        }
        else {
            cartItem = JSON.parse(localStorage.getItem("cart"));
            console.log(cartItem.find(item => item.name === product.name));
            if (cartItem.find(item => item.name === product.name) !== undefined) {
                cartItem.find(item => item.name === product.name).stock += 1;
            }
            else {
                cartItem.push({
                    id: product.id,
                    name: product.name,
                    stock: 1
                });
            }
            localStorage.setItem("cart", JSON.stringify(cartItem));
            this.setState({
                cart: cartItem
            });
        }
    };

    render() {
        return (
            <div>
                <h1>{this.props.match.params.categoryName}</h1>
                <h2>{this.state.category.description}</h2>
                <div class="row">
                    {this.state.productList.map((product) => (
                    <div class="col-md-3 col-sm-6" id="card" key={product.id}>
                        <div class="card">
                            <a href={`/products/${product.id}`}>
                                <img
                                    src={`data:image/jpeg;base64,${product.image}`}
                                    class="card-img-top"
                                    alt="P_1"
                                />
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">{product.name}</h5>
                                <h6 class="card-subtitle">{product.author}</h6>
                                <div>
                                    <Rating
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        initialRating={product.rating}
                                        readonly
                                        id = "product-rating"
                                    />
                                </div>
                                <h6 class="card-text">
                                    {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                </h6>
                                <h6 class="card-text">
                                    Available: {product.stock}
                                </h6>
                                <Button id="btn_detail" href={`/products/${product.id}`}>View Details <FaEye/></Button>
                                <Button id="btn_cart" onClick={ () => this.handleAddToCart(product) }>Add to cart <FaShoppingCart/></Button>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>
        )
    }
}

export default withRouter(CategoryProducts);