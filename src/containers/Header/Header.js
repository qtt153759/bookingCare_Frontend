import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions"; //đã thêm full action
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                //biến USER_ROLE trong constant
                menu = adminMenu; //adminMenu hay doctorMenu được quy định trong menuApp.js
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
            this.setState({
                menuApp: menu,
            });
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator
                        menus={
                            this.state.menuApp
                        } /*Tùy chọn menuApp theo phân quyền */
                    />
                </div>
                {/* nút logout, title='Log out' để hiện chữ log out khi trỏ chuột */}
                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="homeheader.welcome" />,{" "}
                        {userInfo && userInfo.firstName
                            ? userInfo.firstName
                            : ""}
                        !{/*xác thực ntn thì trang web ko bao giờ chết */}
                    </span>
                    <span
                        className={
                            language === LANGUAGES.VI
                                ? "language-vi active"
                                : "language-vi"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={
                            language === LANGUAGES.EN
                                ? "language-en active"
                                : "language-en"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Log out"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn, //key user tìm thấy trong root: reducer
        language: state.app.language, //keys app tìm thấy trong root reducer
        userInfo: state.user.userInfo, //=this.props.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
