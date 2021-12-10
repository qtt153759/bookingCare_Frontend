import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox"; //dùng light box để mở ảnh to trên màn hình
import "react-image-lightbox/style.css"; //library trên npm lightbox
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",
            isOpen: false,
        };
    }

    async componentDidMount() {
        //Cách làm lấy api bình thường
        // try {
        //     let res = await getAllCodeService("gender");
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (e) {}
        this.props.getGenderStart(); //cách viết rút gọn vs mapDispatchToProps và connect bằng thư viện "react-redux"
        //tương đường vs this.props.dispatch(action.fetchGenderStart());
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //render=>didupdate liên tục
        //hiện tại (this) và quá khứ (previous)
        //lúc đầu state.genderRedux[] và props.genderRedux[3];
        //lúc sau thay đổi state.genderRedux[3] và props.genderRedux[3]
        //làm câu điều kiện để nó dừng lại
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
        //react có thể loop để update cả trăm lần ko phải lo
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files; //data{name,lastModified,last.....}
        let file = data[0]; //lấy được tên
        if (file) {
            let objectUrl = URL.createObjectURL(file); //api của html giúp tạo 1 file url
            this.setState({
                previewImgURL: objectUrl,
            });
        }
    };
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };
    render() {
        let isGetGenders = this.props.isLoadingGender;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language; //nhớ là this.props.language,không phải this.state.props
        console.log("hoi danit check props ", this.props);

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
                            <div className="col-12 ">
                                {isGetGenders === true ? "Loading gender" : ""}
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
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
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
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select className="form-control">
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    {/* mẹo để dấu input bằng label cho đẹp: B1: đặt htmlFor trong label bằng id của input, B2 thêm hidden trong input */}
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(event) =>
                                            this.handleOnChangeImage(event)
                                        }
                                    />
                                    <label
                                        className="label-upload"
                                        htmlFor="previewImg"
                                    >
                                        Tải ảnh<i className="fas fa-upload"></i>
                                    </label>
                                    {/* các mở link ảnh bằng style. Lưu ý style ={{}} */}
                                    <div
                                        className="preview-image"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgURL})`,
                                        }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* isOpen=true thì =>LightBox */}
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
