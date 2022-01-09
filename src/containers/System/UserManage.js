import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import _ from "lodash"; // library help us write javascript concisely
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
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
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };
    getAllUsersFromReact = async () => {
        let response = await getAllUsers("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                /**
                 * fire event: child->parent(props)
                 * parent->child(ref)
                 * emitter(event) dung cho ca hai deu dc vs emit+on
                 */
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (e) {
            console.log(e);
        }
    };
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (err) {
            console.log(err);
        }
    };
    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (err) {
            console.log(err);
        }
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
                <ModalUser /*chua tat ca cac attribute in props */
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {/*ca chuyen function qua component con*/}

                {
                    /*do hàm ModalEditUser đã được khởi tạo từ lúc đầu nên nó đã chuyền tất cả các tham số,
                 trường hợp này vô cùng phổ biến và nếu chúng ta muốn cập nhật state thì chỉ có 2 cách giải quyết
                C1:componentDidUpdate
                C2:nhét nó vào hàm điều kiện như trong bài này,
                ở đây this.state.isOpenModalEditUser chuyển true false liên tục=>modal khởi động lại liên tụ
                */
                    this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            toggleFromParent={this.toggleUserEditModal}
                            currentUser={this.state.userEdit}
                            editUser={this.doEditUser}
                        />
                    )
                }

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
                        <tbody>
                            {/*neu ma quen tbody trong table thi se co warning*/}
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    /*phai {} cho ham trong reder*/
                                    return (
                                        /*trong function map phai return ra cai gi day*/
                                        <tr key={index}>
                                            {/*cho tr de tao cot, key={index} lien quan toi warning, chua biet*/}
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {/*nho phai la className ko phai class */}
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
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
