import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ
class HomeHeader extends Component {
    render() {
        return (
            //buộc phải xuất ra 1 block
            <React.Fragment>
                {/*bằng div thôi */}
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <img className="header-logo" src={logo} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        {/* FormattedMessage dùng để chuyển tiếng anh và tiếng việt
                                        lưu ý: phải xét cả 2 cái trong file json ko thì lỗi */}
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.suppor" />
                            </div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className="title2">
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm " />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                    {/*nhét i vào div để sau này chỉnh background thành nền trắng*/}
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child1" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                    {/*nhét i vào div để sau này chỉnh background thành nền trắng*/}
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child2" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-procedures"></i>
                                    {/*nhét i vào div để sau này chỉnh background thành nền trắng*/}
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child3" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                    {/*nhét i vào div để sau này chỉnh background thành nền trắng*/}
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child4" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                    {/*nhét i vào div để sau này chỉnh background thành nền trắng*/}
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child5" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical"></i>
                                    {/*nhét i vào div để sau này chỉnh background thành nền trắng*/}
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.child6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    //map ra các state của redux
    //redux nó nhớ
    return {
        isLoggedIn: state.user.isLoggedIn,
        langague: state.app.langague,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
