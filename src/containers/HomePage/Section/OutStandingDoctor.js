import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import Slider from "react-slick"; //dùng library slick để chuyển slide
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class OutStandDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`); //Tương tự như hàm redirect với withRouter
        }
    };
    render() {
        let arrDoctors = this.state.arrDoctors;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors); //có ít dữ liệu thì chịu khó nhân lên
        let language = this.props.language;
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-contaiter">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.out-standing-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {/* Slider mà ít phần tử quá thì sẽ vỡ khung hình */}
                            {arrDoctors &&
                                arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        //cách đọc blob
                                        imageBase64 = new Buffer(
                                            item.image,
                                            "base64"
                                        ).toString("binary");
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailDoctor(
                                                    item
                                                )
                                            }
                                        >
                                            {/* Tạo nhiều lớp bọc một cái ảnh giúp chỉnh margin vs padding dễ hơn */}
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    {/* nên dùng thẻ div cho ảnh thay vì img nếu không sẽ bị vỡ ảnh */}
                                                    <div
                                                        className="bg-image section-outstanding-doctor"
                                                        style={{
                                                            backgroundImage: `url(${imageBase64})`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="position text-center">
                                                    {/*Load động từ database không phải từ có sẵn trong vi.js hay en.js=> không dùng FormattedMessage */}
                                                    <div>
                                                        {language ===
                                                        LANGUAGES.VI
                                                            ? nameVi
                                                            : nameEn}
                                                    </div>
                                                    <div>Cơ xương khớp 1</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandDoctor)
);
