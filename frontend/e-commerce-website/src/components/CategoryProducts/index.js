import React, { Component } from 'react'
import { get } from "../../httpHelper";
import '../Product/Product.css';
import { Button } from 'reactstrap';
import { withRouter } from "react-router";
class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.fetchProductList = this.fetchProductList.bind(this);
    }
    
    state = {
        productList: []
    };

    
    componentDidMount() {
        this.fetchProductList();
    }
      
    componentDidUpdate(prevProps) {
        if(this.props.match.params.categoryName !== prevProps.match.params.categoryName)
        {
            this.fetchProductList();
        }
    } 

    fetchProductList() {
        get(`/api/categories/${this.props.match.params.categoryName}`).then((response) => {
          if (response.status === 200) {
            response.data.sort(function(a, b) { 
                return a.id - b.id  ||  a.name.localeCompare(b.name);
            });
            this.setState({ productList: response.data });
          }
        }).catch((error => {
            alert("Get product list failed.");
        }));
    }

    render() {
        return (
            <div>
                <h1>{this.props.match.params.categoryName}</h1>
                <div class="row">
                    {this.state.productList.map((product) => (
                    <div class="col-md-3 col-sm-6" id="card" key={product.id}>
                        <div class="card">
                            <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            class="card-img-top"
                            alt="P_1"
                            />
                            <div class="card-body">
                                <h5 class="card-title">{product.name}</h5>
                                <h6 class="card-subtitle">{product.author}</h6>
                                <p class="card-text">
                                    {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                </p>
                                <Button id="btn_detail" href={`/products/${product.id}`}>View Details</Button>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>
        )
    }
}

export default withRouter(CategoryProducts);