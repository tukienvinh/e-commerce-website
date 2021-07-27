import React, { Component } from 'react'
import { FaBan, FaTrash } from 'react-icons/fa';
import { get, post, del } from "../../httpHelper";
import { Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.fetchUserList = this.fetchUserList.bind(this);
        this.handleBlock = this.handleBlock.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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

    deleteUser(id) {
        confirmAlert({
            title: 'Alert',
            message: 'Confirm to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        del(`/api/admins/users/${id}`).then((response) => {
                            if (response.status === 200) {
                                confirmAlert({
                                    title: 'Notification',
                                    message: response.data.message,
                                    buttons: [
                                      {
                                        label: 'Ok',
                                        onClick: () => window.location.href = "/manage/users"
                                      }
                                    ]
                                });
                            }
                        }).catch((error => {
                            confirmAlert({
                                title: 'Error',
                                message: error.response.data.message,
                                buttons: [
                                    {
                                        label: 'Ok',
                                    }
                                ]
                            });
                        }));
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    render() {
        return (
            <div>
                <h1>Manage Users</h1>
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
                            <Button onClick={() => this.deleteUser(user.id) }><FaTrash/></Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }
}
