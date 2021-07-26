import React, { Component } from 'react'
import { FaBan, FaTrash } from 'react-icons/fa';
import { get, post, del } from "../../httpHelper";
import { Button } from 'reactstrap';
import './ManageUsers.css'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.fetchUserList = this.fetchUserList.bind(this);
        this.handleBlock = this.handleBlock.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    };
    
    state = {
        userList: []
    };

    componentDidMount() {
        this.fetchUserList();
    }
    
    fetchUserList() {
        get("/api/admins/users").then((response) => {
            if (response.status === 200) {
                response.data.sort(function(a, b) { 
                    return a.id - b.id  ||  a.name.localeCompare(b.name);
                });
                this.setState({ userList: response.data });
            }
        }).catch((error => {
            console.log(error.response.data.message);
        }));
    };

    handleBlock(id) {
        post(`/api/admins/block/${id}`, {}).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                window.location.href = "/manage/users";
            }
        }).catch((error => {
            console.log(error.response.data.message);
        }));
    };

    deleteCategory(id) {
        del(`/api/admins/users/${id}`).then((response) => {
            if (response.status === 200) {
                alert(response.data.message);
                window.location.href = "/manage/users";
            }
        }).catch((error => {
            alert(error.response.data.message);
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
                    <th>Status</th>
                    <th>Block/Unblock</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.userList.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        {user.status === true ? (
                            <td>Active</td>
                        ) : (
                            <td>Blocked</td>
                        )}
                        <td>
                            <Button onClick={() => this.handleBlock(user.id) }><FaBan/></Button>
                        </td>
                        <td>
                            <Button onClick={() => this.deleteCategory(user.id) }><FaTrash/></Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }
}
