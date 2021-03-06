import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
    //cai modal nay copy tren mang
    constructor(props) {
        super(props);
        this.state = {
            //viet cac cai state cho modal
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            address: "",
        };
        this.listenToEmitter(); //nho la phai khai listen emitter trong constructor
    }
    componentDidMount() {}

    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                address: "",
            });
        });
    };
    toggle = () => {
        this.props.toggleFromParent(); // goi function from modal parent
    };

    handleOnChangeInput = (event, id) => {
        //chuyen tham so id cho no do phai viet nhieu function
        /*bad code modify truc tiep state, lam viec vs he thong lon se nhieu loi, co nhieu lop cha con
         this.state[id]=event.target.value;
         this.setState({
             ...this.state
         },()=>{
             console.log('check bad state',this.state);
         })
         */
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("missing parameter" + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleAddNewUser = async () => {
        let isValidate = this.checkValidateInput();
        if (isValidate) {
            await this.props.createNewUser(this.state); //goi function o parent
        }
    };

    render() {
        return (
            //toggle la moi khi bam ra ngoai vung modal thi modal se tu dong
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    //do la input => tra tham so event
                                    this.handleOnChangeInput(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "password");
                                }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(
                                        event,
                                        "firstName"
                                    );
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "lastName");
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "address");
                                }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handleAddNewUser();
                        }}
                    >
                        Add new
                    </Button>{" "}
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
