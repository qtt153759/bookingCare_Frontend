import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            });
        }
    }
    handleDeleteUser = (user) => {
        this.props.deletaAUserRedux(user.id);
    };
    handleEditUser = (user) => {
        console.log("edit user", user);
    };
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    };

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers &&
                        arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    {/*Đặt key ở đây để cho react biết được các key khác nhau */}
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                this.handleEditUser(item)
                                            }
                                        >
                                            {/*nho phai la className ko phai class */}
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                this.handleDeleteUser(item)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deletaAUserRedux: (id) => dispatch(actions.deletaAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
