import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker"; //thư viện dùng để chọn ngày này được tải về và đã custom sẵn r
import moment from "moment"; //thư viện dùng để format ngày tháng cho client, còn vs nodejs thì chúng ta dùng timeStam
import { toast } from "react-toastify";
import _, { result } from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            rangeTime: [],
            currentDate: "",
        };
    }
    componentDidMount() {
        //gọi luôn từ đầu để lấy thông tin
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //nếu componentDidMount không đủ thì update
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                //Các cách thêm 1 attribute=>loop lại từ đầu và thêm isSelected
                //C1
                // data.map((item) => {
                //     item.isSelected = false;
                //     return item;
                // });
                //C2
                data = data.map((item) => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data,
            });
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors); //mục tiêu là gọi lại hàm này để setState vì nó ko thể update language
        //     this.setState({
        //         listDoctors: dataSelect,
        //     });
        // }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            //vẫn phải loop lại thôi
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected; //đảo dấu đơn giản
                }
                return item;
            });
            this.setState({
                rangeTime: rangeTime,
            });
        }
    };
    handleChangeSelect = async (selectedDoctor) => {
        //có sẵn react-select
        //Cái này onChange mà như kiểu onClick(mỗi lần click là selectedDoctor đã là một doctor hoàn chỉnh r)
        this.setState({ selectedDoctor });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0], //cái thằng thư viện này nó nhả ra 1 array=> lấy phần tử đầu tiên
        });
    };
    handleSaveSchedule = async () => {
        let result = []; //tạo mảng và push
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        if (!currentDate) {
            toast.error("Invalid date");
            return;
        }
        //có array hoặc object=>dùng lodash
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor");
            return;
        }
        // let formatedDate = moment(currentDate).format(
        //     dateFormat.SEND_TO_SERVER
        // );
        let formatedDate = new Date(currentDate).getTime(); //Truyền về server dạng timeStamp
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true
            );
            //Returns the elements of an array that meet the condition specified in a callback function.
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                });
            } else {
                toast.error("Invalid selected time");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result, //Phải trả về kiểu object ko đc dùng saveBulkScheduleDoctor(result)
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,
        });
        console.log("test ", res);
    };
    render() {
        // console.log("xem state", this.state);
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect} //dùng như callback
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6 form group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={
                                                item.isSelected === true
                                                    ? "btn btn-schedule active"
                                                    : "btn btn-schedule"
                                            }
                                            key={index}
                                            onClick={() =>
                                                this.handleClickBtnTime(item)
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
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
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
