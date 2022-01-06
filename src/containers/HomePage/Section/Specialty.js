import React, { Component } from "react";
import { connect } from "react-redux"; //muốn lấy state của redux thì phải dùng connect
// import "./Specialty.scss";
import { FormattedMessage } from "react-intl"; //thư viện dùng để chuyển đổi ngôn ngữ
import "./Specialty.scss";
import Slider from "react-slick"; //dùng library slick để chuyển slide
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = { dataSpecialty: [] };
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`); //Tương tự như hàm redirect với withRouter
        }
    };
    render() {
        //bản chất customize cái setting này là đang truyền props cho Slider
        let { dataSpecialty } = this.state;
        return (
            <div className="section-share section-specialty">
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
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize specialty-child"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailSpecialty(
                                                    item
                                                )
                                            }
                                        >
                                            {/* nên dùng thẻ div cho ảnh thay vì img nếu không sẽ bị vỡ ảnh */}
                                            <div
                                                className="bg-image section-specialty "
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            />
                                            <div className="specialty-name">
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
); //muốn lấy state của redux thì phải dùng connect
