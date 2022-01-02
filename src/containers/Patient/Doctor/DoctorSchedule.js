import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi"; //dù không sử dụng nhưng vẫn phải import chính xác cái dòng này để moment nó hiểu mình muốn chuyển đổi ngôn ngữ
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataSchduleTimeModal: {},
        };
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (allDays && allDays.length > 0) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value
            );
            this.setState({
                allDays: allDays,
            });
        }
    }
    //Hàm viết hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    object.label = `Hôm nay-${ddMM}`;
                } else {
                    object.label = this.capitalizeFirstLetter(
                        moment(new Date()).add(i, "days").format("dddd-DD/MM")
                    );
                } //do đã import localization nên nó mặc định hiểu tiếng việt đầu tiên
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    object.label = `Today-${ddMM}`;
                } else {
                    object.label = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("ddd-DD/MM"); //do import localization nên mặc định nó ko phải tiếng anh nữa=>thêm locale("en")
                }
                object.value = moment(new Date())
                    .add(i, "days")
                    .startOf("day")
                    .valueOf();
            } //muốn kiểu timeStamp số tròn ko giờ không phút thì phải dùng hàm startOf(vì backend ko lưu giờ phút)
            //còn valueOf() giúp convert về dạng milisecond unix time
            arrDays.push(object);
        }
        return arrDays;
    };
    //state hay props thay đổi thì render lại
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value
            );
            this.setState({
                allAvailableTime: res.data ? res.data : [],
            });
        }
    }
    handleOnChangeSelect = async (event) => {
        if (
            this.props.doctorIdFromParent &&
            this.props.doctorIdFromParent !== -1
        ) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : [],
                });
            }
        }
    };
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataSchduleTimeModal: time,
        });
        console.log("Hoi dan it channel:time", time);
    };
    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };
    render() {
        let {
            allDays,
            allAvailableTime,
            isOpenModalBooking,
            dataSchduleTimeModal,
        } = this.state;
        let { language } = this.props;
        console.log(this.state);
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="all-schedule">
                        <select
                            onChange={(event) =>
                                this.handleOnChangeSelect(event)
                            }
                        >
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calender">
                            <i className="fas fa-calendar-alt">
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </span>
                            </i>
                        </div>
                    </div>
                    <div className="time-content">
                        {allAvailableTime && allAvailableTime.length > 0 ? (
                            <>
                                <div className="time-content-btns">
                                    {allAvailableTime.map((item, index) => {
                                        let timeDisplay =
                                            language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn;
                                        return (
                                            <button
                                                key={index}
                                                className={
                                                    language === LANGUAGES.VI
                                                        ? "btn-vi"
                                                        : "btn-en"
                                                }
                                                onClick={() =>
                                                    this.handleClickScheduleTime(
                                                        item
                                                    )
                                                }
                                            >
                                                {timeDisplay}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor." />
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="no-schedule">
                                <FormattedMessage id="patient.detail-doctor.choose" />
                                <i class="fas fa-hand-point-up"></i>
                                <FormattedMessage id="patient.detail-doctor.book-free" />
                            </div>
                        )}
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={dataSchduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
