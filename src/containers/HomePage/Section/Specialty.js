import React, { Component } from "react";
import { connect } from "react-redux"; //muốn lấy state của redux thì phải dùng connect
import "./Specialty.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ

import Slider from "react-slick"; //dùng library slick để chuyển slide
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
    render() {
        //bản chất customize cái setting này là đang truyền props cho Slider
        let settings = {
            //trong thư viện vào trang git npm react slick
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4, //có mấy slide trên show
            slidesToScroll: 1, //mỗi lần next thì tăng mấy
        };
        return (
            <div className="section-speciality">
                <div className="specialty-contenter">
                    <div className="specialty-header">
                        <span className="title-section">
                            Chuyên khoa phổ biến
                        </span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...settings}>
                            <div className="specialty-customize">
                                {/* nên dùng thẻ div cho ảnh thay vì img nếu không sẽ bị vỡ ảnh */}
                                <div className="bg-image" />
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className="specialty-customize">
                                <img className="bg-image" />
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className="specialty-customize">
                                <img className="bg-image" />
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className="specialty-customize">
                                <img className="bg-image" />
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className="specialty-customize">
                                <img className="bg-image" />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className="specialty-customize">
                                <img className="bg-image" />
                                <div>Cơ xương khớp 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //map state từ redux và inject vào component, thường trong mục store/action
    //redux nó nhớ
    return {
        //các key
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    //mapDispatchToProps nghĩa là có thể truy cập vào function thông qua this.props
    //fire các event của redux
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty); //muốn lấy state của redux thì phải dùng connect
