import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule";
import DoctorExtraInfor from "../../System/Doctor/DoctorExtraInfor";
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        };
    }
    async componentDidMount() {
        //lấy id từ hàm này trong outStandingDoctor this.props.history.push(`/detail-doctor/${doctor.id}`)
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            this.setState({
                currentDoctorId: id, //Truyền luôn id vào currentDoctorId để thằng con nhận nhanh nhất
            });
            if (res && res.errCode == 0) {
                this.setState({
                    detailDoctor: res.data,
                    // currentDoctorId: id,Chú ý bất đồng bộ, mục tiêu của ta là tạo thật nhanh currentDoctorId để truyền vào tk con
                });
            }
            console.log("hoi dan it", res);
        }
    }
    render() {
        let { detailDoctor } = this.state;
        let language = this.props.language;

        let nameVi = "";
        let nameEn = "";
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            // shortcut của fragment
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${
                                    detailDoctor && detailDoctor.image
                                        ? detailDoctor.image
                                        : ""
                                })`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description && (
                                        <span>
                                            {detailDoctor.Markdown.description}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                //VÍ dụ minh họa cho thấy truyền id cho tk con bị chậm
                                // doctorIdFromParent={
                                //     detailDoctor && detailDoctor.id
                                //         ? detailDoctor.id
                                //         : -1
                                // }
                                //Cách truyền nhanh
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor &&
                            detailDoctor.Markdown &&
                            detailDoctor.Markdown.contentHTML && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: detailDoctor.Markdown
                                            .contentHTML,
                                    }}
                                ></div>
                            )}
                    </div>
                    <div className="comment-doctor"></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
