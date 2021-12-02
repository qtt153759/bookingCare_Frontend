import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
class ModalUser extends Component {
    //cai modal nay copy tren mang
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent(); // goi function from modal parent
    };
    render() {
        console.log("check child props", this.props); //cai props nay chi la bien truyen vao constructor moi khi goi ModalUser
        console.log("check child open modal ", this.props.isOpen);
        return (
            //toggle la moi khi bam ra ngoai vung modal thi modal se tu dong
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text" />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-3"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        Save change
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
