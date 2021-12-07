import React, { Component } from "react";
import { connect } from "react-redux"; //muốn lấy state của redux thì phải dùng connect
import "./Specialty.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ

import Slider from "react-slick"; //dùng library slick để chuyển slide
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
    render() {
        let settings = {
            //trong thư viện vào trang git npm react slick
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className="section-speciality">
                <Slider {...settings}>
                    <div className="img-customize">
                        <h3>1</h3>
                    </div>
                    <div className="img-customize">
                        <h3>2</h3>
                    </div>
                    <div className="img-customize">
                        <h3>3</h3>
                    </div>
                    <div className="img-customize">
                        <h3>4</h3>
                    </div>
                    <div className="img-customize">
                        <h3>5</h3>
                    </div>
                    <div className="img-customize">
                        <h3>6</h3>
                    </div>
                </Slider>
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
