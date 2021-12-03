import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { divide } from "lodash";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //luu trang thai state
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }
    handelOnChangeUsername = (event) => {
        this.setState({
            //set lai state
            username: event.target.value,
        });
        console.log(event.target.value);
    };
    handelOnChangePassword = (event) => {
        this.setState({
            //set lai state
            password: event.target.value,
        });
        console.log(event.target.value);
    };
    handleLogin = async () => {
        this.setState({
            //clear cai loi cu di khong thi no ko mat loi
            errMessage: "",
        });
        try {
            //quen try catch thi sever ngom
            let data = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("login succeeds");
            }
        } catch (err) {
            if (err.response) {
                //cach lay errMessage trong axios
                if (err.response.data) {
                    this.setState({
                        errMessage: err.response.data.message,
                    });
                }
            }
            console.log("hoidanit", err.response);
        }
    };
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    render() {
        //JSX
        return (
            <div>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Login</div>
                            {/*co 12 colum */}
                            <div className="col-12 form-group login-input">
                                {/*bo tri theo thu tu thang dung nguoc vs form-inline*/}
                                <label>UserName:</label>
                                {/*noi de nhap dung form-control*/}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={this.state.username}
                                    onChange={(event) =>
                                        this.handelOnChangeUsername(event)
                                    }
                                />
                                {/*co onChange thi moi thay doi input duoc, luu y chi dung arrow*/}
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password:</label>
                                <div class="custom-input-password">
                                    <input
                                        type={
                                            this.state.isShowPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={(event) =>
                                            this.handelOnChangePassword(event)
                                        }
                                    />
                                    {/*onChang onClich thay doi bien trong canh class*/}
                                    <span
                                        onClick={() =>
                                            this.handleShowHidePassword()
                                        }
                                    >
                                        <i
                                            className={
                                                this.state.isShowPassword
                                                    ? "fas fa-eye"
                                                    : "fas fa-eye-slash"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: "red" }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12">
                                <button
                                    class="btn-login"
                                    onClick={(event) => {
                                        this.handleLogin();
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">
                                    Forgot your password
                                </span>
                            </div>
                            <div className="col-12 text-center  mt-3">
                                {" "}
                                {/*text-center la can giua, mt-3 la margin top =3 */}
                                <span className="text-orther-login">
                                    Or login with:
                                </span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) =>
            dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
