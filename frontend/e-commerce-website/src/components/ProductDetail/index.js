import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { get } from "../../httpHelper";
import StarRatings from 'react-star-ratings';
import './ProductDetail.css'

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.fetchProductById = this.fetchProductById.bind(this);
    }

    componentDidMount() {
        this.fetchProductById();
    }

    state = {
        product: []
    }

    fetchProductById() {
        get(`/api/products/product/${this.props.match.params.productId}`).then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              this.setState({ product: response.data });
            }
          }).catch((error => {
              console.log(error.response.data.value);
          }));
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
      }

    render() {
        return (
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
                    <StarRatings
                        rating={this.state.product.rating}
                        starRatedColor="#ffcd3c"
                        starHoverColor="#ffcd3c"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="40px"
                        starSpacing="15px"
                    />
                    <h5>{this.state.product.num_rating} reviews</h5>
                    <p>Description: {this.state.product.description}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductDetail);