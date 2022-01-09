import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
        };
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files; //data{name,lastModified,last.....}
        let file = data[0]; //lấy được tên
        if (file) {
            let base64 = await CommonUtils.getBase64(file); //Lưu xuống dataBase thông qua base64 dùng utils
            this.setState({
                imgBase64: base64,
            });
        }
    };
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };
    render() {
        let { isOpenModal, closeRemedyModal, dataModal } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={"booking-modal-container"}
                size="mg"
                centered
            >
                <div className="modal-header">
                    <h5 class="modal-title">
                        Gửi hóa đơn khám bệnh thành công
                    </h5>
                    <button
                        type="butotn"
                        className="close"
                        aria-label="Close"
                        onClick={closeRemedyModal}
                    >
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input
                                className="form-control"
                                type="email"
                                value={this.state.email}
                                onChange={(event) =>
                                    this.handleOnchangeEmail(event)
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn file đơn thuốc</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) =>
                                    this.handleOnChangeImage(event)
                                }
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.handleSendRemedy()}
                    >
                        Send
                    </Button>
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
