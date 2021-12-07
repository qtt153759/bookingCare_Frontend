import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE, //cái này ko chuyền data
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal, //cái này có chuyền data
});

export const changeLanguageApp = (languageInput) => ({
    //luôn truyền type
    type: actionTypes.CHANG_LANGUAGE,
    language: languageInput,
    //ngay khi chạy hàm này nó sẽ chạy vào appReducer
});
