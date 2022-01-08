import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ
import Slider from "react-slick"; //dùng library slick để chuyển slide
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = { dataClinic: [] };
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : [],
            });
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`); //Tương tự như hàm redirect với withRouter
        }
    };
    render() {
        let { dataClinic } = this.state;
        return (
            <div className="section-share section-medical-facility">
                <div className="section-contaiter">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.specialty-popular" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic &&
                                dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize medical-facility-child"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailClinic(
                                                    item
                                                )
                                            }
                                        >
                                            {/* nên dùng thẻ div cho ảnh thay vì img nếu không sẽ bị vỡ ảnh */}
                                            <div
                                                className="bg-image section-medical-facility "
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            />
                                            <div className="medical-facility-name">
                                                {item.name}
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
