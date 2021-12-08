import React, { Component } from "react";
import { connect } from "react-redux"; //muốn lấy state của redux thì phải dùng connect
// import "./HandBook.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ

import Slider from "react-slick"; //dùng library slick để chuyển slide

class HandBook extends Component {
    render() {
        //bản chất customize cái setting này là đang truyền props cho Slider

        return (
            <div className="section-share section-handBook">
                <div className="section-contaiter">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                {/* nên dùng thẻ div cho ảnh thay vì img nếu không sẽ bị vỡ ảnh */}
                                <div className="bg-image section-handBook " />
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className="section-customize">
                                <img className="bg-image section-handBook" />
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className="section-customize">
                                <img className="bg-image section-handBook" />
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className="section-customize">
                                <img className="bg-image section-handBook" />
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className="section-customize">
                                <img className="bg-image section-handBook" />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className="section-customize">
                                <img className="bg-image section-handBook" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook); //muốn lấy state của redux thì phải dùng connect
