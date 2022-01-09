import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { postPatientBookAppointment } from "../../../../services/userService";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            genders: "",
            doctorId: "",
            selectedGender: "",
            timeType: "",
        };
    }
    async componentDidMount() {
        this.props.getGender();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        //thay doi ngon ngu la thay doi tat
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataInputSelect(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataInputSelect(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label =
                    language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    handleOnChangeInput = (event, id) => {
        //file input phai luu y
        let valueInput = event.target.value;
        let stateCopy = { ...this.state }; //phải modify gián tiếp(VD nếu modify trực tiếp thằng cha thì tất cả tk con sẽ phải gọi lại=>nhiều component=>lỗi)
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0], //cái thằng thư viện này nó nhả ra 1 array=> lấy phần tử đầu tiên
        });
    };
    handleOnChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };
    buildTimeBooking = (dataTime) => {
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
            return `${time} - ${date}`;
        }
        return <></>;
    };
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return "";
    };
    handleConfirmBooking = async () => {
        let birthday = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.props.dataTime.date,
            birthday: birthday,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!");
            this.props.closeBookingClose();
        } else {
            toast.error("Booking a new appointment error!");
        }
    };
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId =
            dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ""; //cách viết điều kiện chuyên nghiệp
        return (
            <Modal
                isOpen={isOpenModal}
                className={"booking-modal-container"}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right" onClick={closeBookingClose}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "fullName"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(event, "email")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "address"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "reason"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.birthDay" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBookingClose}
                        >
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
