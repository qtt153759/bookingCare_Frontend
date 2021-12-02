import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        let response = await getAllUsers("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    /**
     * Life cycle
     * run component:
     * 1.run construc-> init state
     * 2. did mount(set state)
     * 3.render
     *
     */

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                {/*cai modaluser viet tat nay de tao modal */}
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    size="lg"
                />
                {/*ca chuyen function qua component con*/}
                <div className="title text-center">Manage user with qtt</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        {/*px =pading chieu x, py la chieu  y*/}
                        <i className="fas fa-plus"></i> Add user
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers /*phai {} cho ham trong reder*/ &&
                            arrUsers.map((item, index) => {
                                console.log("eric check map", item, index);
                                return (
                                    /*trong function map phai return ra cai gi day*/
                                    <tr key={index}>
                                        {/*cho tr de tao cot, key={index} lien quan toi warning, chua biet*/}
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit">
                                                <i class="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="btn-delete">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);