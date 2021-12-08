import React, { Component } from "react";
import { connect } from "react-redux"; //muốn lấy state của redux thì phải dùng connect
// import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ

class HomeFooter extends Component {
    render() {
        //bản chất customize cái setting này là đang truyền props cho Slider

        return (
            <div className="home-footer">
                <p>
                    &copy;2021 Quách Thế Trường. More information, please visit
                    my youtube channel.
                    {/* cách link và target cho open in new tap */}
                    <a target="_blank" href="https://github.com/qtt153759">
                        &#8594; Click here &#8592;
                    </a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter); //muốn lấy state của redux thì phải dùng connect
