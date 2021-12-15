import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
const mdParser = new MarkdownIt(/* Markdown-it options */); //có sẵn MarkdownIt đi kèm vs MdEditor
const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];
// Finish!
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "", //Yêu cầu phải có của react-select
            description: "",
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    handleSaveContentMarkdown = () => {
        console.log("hoidanit check state: ", this.state);
    };
    handleChange = (selectedDoctor) => {
        //có sẵn react-select
        this.setState({ selectedDoctor });
        console.log(`Option selected:`, selectedDoctor);
    };
    handelOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };
    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Manage-doctor</div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange} //dùng như callback
                            options={options}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.handelOnChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange} //cái này là truyền props xuống không dùng ()=>this.handleEditiorChange
                    />
                </div>
                <button
                    className="save-content-doctor"
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deletaAUserRedux: (id) => dispatch(actions.deletaAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
