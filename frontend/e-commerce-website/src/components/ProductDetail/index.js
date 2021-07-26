import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { get, post } from "../../httpHelper";
import 'font-awesome/css/font-awesome.min.css';
import Rating from 'react-rating'
import './ProductDetail.css'
import { FaShoppingCart } from 'react-icons/fa';
import { Button } from 'reactstrap';
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.fetchProductById = this.fetchProductById.bind(this);
        this.fetchRatingList = this.fetchRatingList.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.fetchProductById();
        this.fetchRatingList();
    }

    state = {
        product: [],
        ratingList: [],
        value: "",
        rating_point: 0,
        test_value: "Vinh Tu\nlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum\n26/07/2021"
    }

    fetchProductById() {
        get(`/api/products/product/${this.props.match.params.productId}`).then((response) => {
            if (response.status === 200) {
            //   console.log(response.data);
              this.setState({ product: response.data });
            }
          }).catch((error => {
              console.log(error.response.data.value);
          }));
    }

    fetchRatingList() {
        get(`/api/ratings/${this.props.match.params.productId}`).then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              this.setState({ ratingList: response.data });
            }
          }).catch((error => {
              console.log(error.response.data.message);
          }));
    }

    handleFieldChange(e, key) {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value});
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.value);
        console.log(this.state.rating_point);
        post(`/api/ratings`, {
            product_id: this.props.match.params.productId,
            content: this.state.value,
            rating_point: this.state.rating_point
        }).then((response) => {
            if (response.status === 200) {
                alert(response.data.message);
                window.location.href = `/products/${this.props.match.params.productId}`;
            }
        }).catch((error => {
            alert(error.response.data.message);
        }));
    }

    handleClick(rating) {
        this.setState({rating_point: rating});
      }

    render() {
        return (
            <div>
                <div class="row" id="row_detail">
                    <div class="col-md-6">
                        <img
                            src={'data:image/jpg;base64,' + this.state.product.image}
                            class="card-img-top"
                            alt="P_1"
                        />
                    </div>
                    <div class="col-md-6" id="product_detail">
                        <h4>{this.state.product.name}</h4>
                        <h5>Author: {this.state.product.author}</h5>
                        <div id="rating-point">
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                initialRating={this.state.product.rating}
                                readonly
                                id = "product-rating"
                            />
                            <h5>{this.state.product.rating}/5</h5>
                        </div>
                        <h5>{this.state.product.num_rating} reviews</h5>
                        <h5>Description</h5>
                        <div id="description">
                            <hr/>
                            <p>{this.state.product.description}</p> 
                        </div>
                        <Button>Add to cart <FaShoppingCart/></Button>
                    </div>
                </div>

                <div class="row" id="reviews">
                    <h4>Reviews({this.state.ratingList.length})</h4>
                    {localStorage.getItem("loggedIn") && (
                    <form onSubmit={(e) => this.handleFormSubmit(e)} id="form_submit">
                        <div id="user-review">
                            <div>
                                <textarea 
                                    id="user_rating" 
                                    value={this.state.value} 
                                    onChange={(e) => this.handleFieldChange(e, "value")}
                                />
                            </div>
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                id = "list-rating"
                                initialRating={this.state.rating_point}
                                onClick={(rating) => this.handleClick(rating)} 
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                    )}
                    <div id="list-reviews">
                        {this.state.ratingList.map((rating) => (
                            <div id="item-review">
                                <div>
                                    <p><b>{rating.user.name}</b><br></br>
                                    {rating.content}<br></br>
                                    {rating.rating_date}</p>
                                </div>
                                <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    id = "list-rating"
                                    initialRating={rating.rating_point}
                                    readonly
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductDetail);