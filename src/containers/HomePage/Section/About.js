import React, { Component } from "react";
import { connect } from "react-redux"; //muốn lấy state của redux thì phải dùng connect
// import "./About.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ

class About extends Component {
    render() {
        //bản chất customize cái setting này là đang truyền props cho Slider

        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Demo Project BookingCare
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        {/* cái iframe này thì vào video youtube click chuột phải vào copy embed code */}
                        <iframe
                            width="100%" //tùy chỉnh chiều cao,độ rộng
                            height="400"
                            src="https://www.youtube.com/embed/21tjOW8BvB4"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        {/* phải viết theo quy chuẩn ko thì sẽ có warning vd: frameBorder thay vì frameborder */}
                    </div>
                    <div className="content-right">
                        <p>
                            Nếu như trong bài N4, các bạn đã biết về sản phẩm
                            đạt được khi kết thúc khóa học fullstack SERN này.
                            (SQL, Express, React và Node.js). Vậy khi chạy môi
                            trường production, liệu nó có gì khác ? Điểm khác
                            biệt ở đây chính là chúng ta sẽ xử lý API, database
                            với môi trường thực tế, làm thật, triển khai thật.
                            Và đặc biệt hơn nữa là mình sẽ 'nhúng' luôn chatbot
                            vào website của chúng ta
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
//Redux khác Local Storage là redux kết nối liên tục vs react còn localStorage koo thay đổi state đc
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

export default connect(mapStateToProps, mapDispatchToProps)(About); //muốn lấy state của redux thì phải dùng connect
