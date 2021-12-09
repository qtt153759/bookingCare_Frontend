import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data,
                });
            }
        } catch (e) {}
    }

    render() {
        console.log("hoi danit check state ", this.state);
        let genders = this.state.genderArr;
        let language = this.props.language; //nhớ là this.props.language,không phải this.state.props
        return (
            <div className="user-redux-container">
                <div className="title">UserRedux hoi dan it</div>
                <div className="user-redux-body">
                    {/* Boostrap bao gio cu o trong className="container" */}
                    <div className="container">
                        {/*Trong container l className="row, nen dung boostrap thay vi flex",dung form boostrap co dan giao dien ko bao gio toang */}
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                    r
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select className="form-control">
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            //console.log(index); 0,1,2
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI
                                                        ? item.valueV
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select className="form-control">
                                    <option selected></option>
                                    <option selected></option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select className="form-control">
                                    <option selected></option>
                                    <option selected></option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">
                                    <FormattedMessage id="manage-user.save" />
                                </button>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
