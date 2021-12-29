import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi"; //dù không sử dụng nhưng vẫn phải import chính xác cái dòng này để moment nó hiểu mình muốn chuyển đổi ngôn ngữ
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        };
    }
    componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }
    //Hàm viết hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrDays = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = this.capitalizeFirstLetter(
                    moment(new Date()).add(i, "days").format("dddd-DD/MM")
                ); //do đã import localization nên nó mặc định hiểu tiếng việt đầu tiên
            } else {
                object.label = moment(new Date())
                    .add(i, "days")
                    .locale("en")
                    .format("ddd-DD/MM"); //do import localization nên mặc định nó ko phải tiếng anh nữa=>thêm locale("en")
            }
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf(); //muốn kiểu timeStamp số tròn ko giờ không phút thì phải dùng hàm startOf(vì backend ko lưu giờ phút)
            //còn valueOf() giúp convert về dạng milisecond unix time
            arrDays.push(object);
        }
        this.setState({
            allDays: arrDays,
        });
    };
    //state hay props thay đổi thì render lại
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
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
            console.log("res", res);
        }
    };
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="manage-schedule-container">
                <div className="all-schedule">
                    <select
                        onChange={(event) => this.handleOnChangeSelect(event)}
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
                            <span>Lịch khám</span>
                        </i>
                    </div>
                </div>
                <div className="time-content">
                    {allAvailableTime && allAvailableTime.length > 0 ? (
                        allAvailableTime.map((item, index) => {
                            console.log("item", item.timeType);
                            let timeDisplay =
                                language === LANGUAGES.VI
                                    ? item.timeTypeData.valueVi
                                    : item.timeTypeData.valueEn;
                            return <button key={index}>{timeDisplay}</button>;
                        })
                    ) : (
                        <div>
                            Bác sĩ không có lịch hẹn này vui lòng chọn ngày khác
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
