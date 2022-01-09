import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { getAllPatientForDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { postSendRemedy } from "../../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [], //thật ra ở đây dạng object thì backend gửi lên 1 array cx ghi đè thôi
            isOpenRemedyModal: false,
            dataModal: {},
            isShowloading: false,
        };
    }
    async componentDidMount() {
        await this.getDataPatient();
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0], //cái thằng thư viện này nó nhả ra 1 array=> lấy phần tử đầu tiên
            },
            // thay vì async await thì dùng call back , lưu ý không cần componentDidUpdate
            async () => {
                await this.getDataPatient();
            }
        );
    };
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
        });
    };
    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowloading: true,
        });
        let res = await postSendRemedy({
            ...dataChild,
            ...dataModal,
            language: this.props.language,
        });
        if (res && res.errCode === 0) {
            toast.success("send remedy success");
            await this.getDataPatient();
        } else {
            toast.error("send remedy wrong");
        }
        this.setState({
            isShowloading: false,
        });
        this.closeRemedyModal();
    };
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-patient-container">
                    <LoadingOverlay
                        active={this.state.isShowloading}
                        spinner
                        text="Loading your content..."
                    >
                        <div className="m-p-title">Quản lý khám bệnh</div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Time</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Action</th>
                                        </tr>
                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    No data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </LoadingOverlay>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
