import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    //initialState cho redux
    started: true,
    language: "vi",
    systemMenuPath: "/system/user-manage",
    contentOfConfirmModal: {
        ...initContentOfConfirmModal,
    },
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state, //reducer map vào state
                started: true,
            };
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal,
                },
            };
        case actionTypes.CHANG_LANGUAGE: //reducer map vào state
            console.log("hoi dan it ", action);
            return {
                ...state, //lưu lại những cái cũ
                language: action.language, //action chỉ là 1 object ghi thông tin
            };
        default:
            return state;
    }
};

export default appReducer;
