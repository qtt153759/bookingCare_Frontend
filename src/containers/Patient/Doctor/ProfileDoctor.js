import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getProfileDoctorById } from "../../../services/userService";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format"; //Chuyên để format số
import moment from "moment";
import _ from "lodash";
import { Link } from "react-router-dom"; //dùng link thay vì herf thì ko phải load lại trang
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.EN
                    ? dataTime.timeTypeData.valueEn
                    : dataTime.timeTypeData.valueVi;
            let date =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .local("en")
                          .format("ddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        {" "}
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            );
        }
        return <></>;
    };
    render() {
        let { dataProfile } = this.state;
        let {
            language,
            isShowDescriptionDoctor,
            dataTime,
            isShowLinkDetail,
            isShowPrice,
            doctorId,
        } = this.props;
        let nameVi = "";
        let nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : ""
                            })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>
                                                {
                                                    dataProfile.Markdown
                                                        .description
                                                }
                                            </span>
                                        )}
                                </>
                            ) : (
                                <>
                                    {/* cách viết function render ra div */}
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className="view-detail-doctor">
                        {/* Cái cách link của react này ngon này */}
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                        {/* không muốn dùng thẻ a vì sẽ phải load lại trang <a href={`/detail-doctor/${doctorId}`}>Xem thêm</a> */}
                    </div>
                )}
                {isShowPrice === true && (
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.price" />

                        {dataProfile &&
                            dataProfile.Doctor_Infor &&
                            language === LANGUAGES.VI && (
                                <NumberFormat
                                    className="currency"
                                    value={
                                        dataProfile.Doctor_Infor.priceTypeData
                                            .valueVi
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={"VND"}
                                />
                            )}
                        {dataProfile &&
                            dataProfile.Doctor_Infor &&
                            language === LANGUAGES.EN && (
                                <NumberFormat
                                    className="currency"
                                    value={
                                        dataProfile.Doctor_Infor.priceTypeData
                                            .valueEn
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={"USD"}
                                />
                            )}
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
