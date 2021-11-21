import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state={//luu trang thai state
            username:"",
            password:"",
            isShowPassword:false
        }
    }
    handelOnChangeUsername=(event)=>{
        this.setState({//set lai state
            username:event.target.value
        })
        console.log(event.target.value);
    }
    handelOnChangePassword=(event)=>{
        this.setState({//set lai state
            password:event.target.value
        })
        console.log(event.target.value);
    }
    handleLogin=()=>{
        console.log(`username: ${this.state.username}, password: ${this.state.password}`)
    }
    handleShowHidePassword=()=>{
        this.setState({
            isShowPassword:!this.state.isShowPassword
        })
    }
    render() {
        //JSX
        return (
            <div>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Login</div>
                            <div className="col-12 form-group login-input">
                                <label>UserName:</label>
                                <input type="text" 
                                className="form-control" 
                                placeholder="Enter your username"
                                value={this.state.username} 
                                onChange={(event)=>this.handelOnChangeUsername(event)}/>{/*co onChange thi moi thay doi input duoc, luu y chi dung arrow*/}
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password:</label>
                                <div class="custom-input-password">
                                <input type={this.state.isShowPassword ? "text":"password"} 
                                className="form-control"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={(event)=>this.handelOnChangePassword(event)}/>{/*onChang onClich thay doi bien trong canh class*/}
                                <span onClick={()=>this.handleShowHidePassword()}>
                                    <i class={this.state.isShowPassword?"fas fa-eye":"fas fa-eye-slash"}></i>
                                </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <button class="btn-login" onClick={(event)=>{this.handleLogin()}}>Login</button>
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">Forgot your password</span>
                            </div>
                            <div className="col-12 text-center  mt-3"> {/*mt-3 la margin top =3 */}
                                <span className="text-orther-login">Or login with:</span>
                            </div>
                            <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
