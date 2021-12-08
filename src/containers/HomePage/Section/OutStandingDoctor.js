import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import Slider from "react-slick"; //dùng library slick để chuyển slide

class OutStandDoctor extends Component {
    render() {
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-contaiter">
                    <div className="section-header">
                        <span className="title-section">
                            Bác sĩ nổi bật tuần qua
                        </span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                {/* Tạo nhiều lớp bọc một cái ảnh giúp chỉnh margin vs padding dễ hơn */}
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        {/* nên dùng thẻ div cho ảnh thay vì img nếu không sẽ bị vỡ ảnh */}
                                        <div className="bg-image section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            Giáo sư, tiến sĩ Quách Thế Trường
                                        </div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            Giáo sư, tiến sĩ Quách Thế Trường
                                        </div>
                                        <div>Cơ xương khớp 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            Giáo sư, tiến sĩ Quách Thế Trường
                                        </div>
                                        <div>Cơ xương khớp 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            Giáo sư, tiến sĩ Quách Thế Trường
                                        </div>
                                        <div>Cơ xương khớp 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            Giáo sư, tiến sĩ Quách Thế Trường
                                        </div>
                                        <div>Cơ xương khớp 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="bg-image section-outstanding-doctor" />
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            Giáo sư, tiến sĩ Quách Thế Trường
                                        </div>
                                        <div>Cơ xương khớp 6</div>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandDoctor);
