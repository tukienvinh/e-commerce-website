import React, { Component } from 'react'
import { get } from "../../httpHelper";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.fetchCategoryList = this.fetchCategoryList.bind(this);
    }
    
    state = {
        categoryList: []
    };

    componentDidMount() {
        this.fetchCategoryList();
    }

    fetchCategoryList() {
        get("/api/categories").then((response) => {
          if (response.status === 200) {
            this.setState({ categoryList: response.data });
          }
        }).catch((error => {
            console.log(error.response.data.value);
        }));
    }

    render() {
        return (
            <div>
                <table id="table">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categoryList.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.email}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
