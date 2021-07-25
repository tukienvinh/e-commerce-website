import React, { Component } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { get, del, put } from "../../httpHelper";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './ManageCategory.css'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.fetchCategoryList = this.fetchCategoryList.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    };
    
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
            console.log(error.response.data.message);
        }));
    };

    deleteCategory(category) {
        del(`/api/categories/category/${category}`).then((response) => {
            if (response.status === 200) {
                window.location.href = "/edit/categories";
            }
        }).catch((error => {
            alert("Delete category failed.");
        }));
    };

    editCategory(category) {
        put(`/api/categories/category/${category}`).then((response) => {
            if (response.status === 200) {
                window.location.href = "/edit/categories";
            }
        }).catch((error => {
            alert("Edit category failed.");
        }));
    };

    render() {
        return (
            <div>
                <table id="table">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.categoryList.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            <Button onClick={() => this.deleteCategory(category.id) }><FaTrash/></Button>
                        </td>
                        <td>
                            <Button href={`/edit/categories/edit/${category.id}`}><FaEdit/></Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <Link to="/edit/categories/add"><Button>Add new category</Button></Link>
            </div>
        )
    }
}
