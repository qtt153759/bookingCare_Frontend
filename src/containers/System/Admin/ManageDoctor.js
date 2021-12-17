import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";
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
            listDoctors: [],
            hasOldData: false,
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
    }
    //Cách tạo input theo yêu cầu tiêu chuẩn
    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors); //mục tiêu là gọi lại hàm này để setState vì nó ko thể update language
            this.setState({
                listDoctors: dataSelect,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };
    handleChangeSelect = async (selectedDoctor) => {
        //có sẵn react-select
        //Cái này onChange mà như kiểu onClick(mỗi lần click là selectedDoctor đã là một doctor hoàn chỉnh r)
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
            });
        }
        console.log(`Option selected:`, selectedDoctor);
    };
    handelOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };
    render() {
        let { hasOldData } = this.state;
        console.log("hasOlddat", hasOldData);
        console.log("state", this.state);
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Manage-doctor</div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect} //dùng như callback
                            options={this.state.listDoctors}
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
                    {/* Cả cái MdEditor này copy trên document MdEditor */}
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange} //cái này là truyền props xuống không dùng ()=>this.handleEditiorChange
                        value={this.state.contentMarkdown} //lên trên mạng gõ react-markdown-editor-lite set default value
                    />
                </div>
                <button
                    className={
                        hasOldData === true
                            ? "save-content-doctor"
                            : "create-content-doctor"
                    }
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? (
                        <span>Lưu thông tin</span>
                    ) : (
                        <span>Tạo thông tin</span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
