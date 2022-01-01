import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi"; //dù không sử dụng nhưng vẫn phải import chính xác cái dòng này để moment nó hiểu mình muốn chuyển đổi ngôn ngữ
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        };
    }
    async componentDidMount() {}

    //state hay props thay đổi thì render lại
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };
    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">Địa chỉ khám</div>
                    <div className="name-clinic">Phòng khám da liễu</div>
                    <div className="detail-address">
                        207 Phố huế- Hai bà trưng -hà nội
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false ? (
                        <div className="short-infor">
                            Giá khám 250.000.
                            <span
                                onClick={() =>
                                    this.showHideDetailInfor(!isShowDetailInfor)
                                }
                            >
                                xem chi tiết
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="title-price"> Giá khám:</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">Giá khám</span>
                                    <span className="right">250.000đ</span>
                                </div>
                                <div className="note">
                                    Giá khám ưu tiên cho người nước ngoài là 30
                                    USD
                                </div>
                            </div>
                            <div className="payment">
                                Phòng khám có thanh toán bằng hình thức tiền mặt
                                và quẹt thẻ
                            </div>
                            <div className="hide-price">
                                <span
                                    onClick={() =>
                                        this.showHideDetailInfor(
                                            !isShowDetailInfor
                                        )
                                    }
                                >
                                    ẩn bớt
                                </span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
