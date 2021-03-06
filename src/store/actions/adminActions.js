import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getAllSpecialty,
    getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify"; //library for alert
// export const fetchGenderStart = () => ({
//     type: actionTypes.FEETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
    //nếu không return 1 function thì error:Unhandled Rejection (Error):Actions must be plain objects
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data)); //fire action thì phải bọc trong dispatch
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            console.log("fetchGenderStart error", e);
            dispatch(fetchGenderFailed());
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS, //FEETCH_GENDER_SUCCESS=>Unhandled Rejection (Error): Actions may not have an undefined "type" propert
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    //nếu không return 1 function thì error:Unhandled Rejection (Error):Actions must be plain objects
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data)); //fire action thì phải bọc trong dispatch
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            console.log("fetchPositionStart error", e);
            dispatch(fetchPositionFailed());
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS, //FEETCH_GENDER_SUCCESS=>Unhandled Rejection (Error): Actions may not have an undefined "type" propert
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    //nếu không return 1 function thì error:Unhandled Rejection (Error):Actions must be plain objects
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data)); //fire action thì phải bọc trong dispatch
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            console.log("fetchRoleStart error", e);
            dispatch(fetchRoleFailed());
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS, //FEETCH_ROLE_SUCCESS=>Unhandled Rejection (Error): Actions may not have an undefined "type" propert
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart()); //cập nhật lại table data ngay khi save thành công, không thì phải refresh trang
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error", e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});
export const fetchAllUsersStart = () => {
    //nếu không return 1 function thì error:Unhandled Rejection (Error):Actions must be plain objects
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse())); //đảo ngược array
                //nó trả ra res.users ko phải data=>nếu res.data=>undifined
            } else {
                toast.error("Fetch all user error");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all user error");
            console.log("fetchRoleStart error", e);
            dispatch(fetchAllUsersFailed());
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});
export const deletaAUser = (userId) => {
    //bản chất thì delete cx chẳng cần reducer đâu
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart()); //cập nhật lại table data ngay khi save thành công, không thì phải refresh trang
            } else {
                toast.error("Delete the user error");
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error");
            dispatch(deleteUsersFailed());
            console.log("saveUserFailed error", e);
        }
    };
};
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data,
});

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});
export const editaAUser = (data) => {
    //bản chất thì delete cx chẳng cần reducer đâu
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update user succeed");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart()); //cập nhật lại table data ngay khi save thành công, không thì phải refresh trang
            } else {
                toast.error("Update the user error");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error");
            dispatch(editUserFailed());
        }
    };
};
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    users: data,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("");
            if (res && res.errCode === 0) {
                dispatch({
                    //thực chất cũng chẳng cần hàm gì đâu dispatch 1 action với type và dâta là ok r, ko cầ 1 function nữa làm gì
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
        }
    };
};
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    //thực chất cũng chẳng cần hàm gì đâu dispatch 1 action với type và dâta là ok r, ko cầ 1 function nữa làm gì
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
        }
    };
};
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save infor detail doctor succeed");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                });
            } else {
                toast.error("Save infor detail doctor error");
                dispatch({ type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED });
            }
        } catch (e) {
            console.log(e);
            toast.error("Save infor detail doctor error");

            dispatch({ type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED });
        }
    };
};
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    //thực chất cũng chẳng cần hàm gì đâu dispatch 1 action với type và dâta là ok r, ko cầ 1 function nữa làm gì
                    type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({ type: actionTypes.FETCH_ALLCODE_TIME_FAILED });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_ALLCODE_TIME_FAILED });
        }
    };
};
export const getRequiredDoctorInfor = () => {
    //nếu không return 1 function thì error:Unhandled Rejection (Error):Actions must be plain objects
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data)); //fire action thì phải bọc trong dispatch
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            console.log("fetchRequiredDoctorInforFailed error", e);
            dispatch(fetchRequiredDoctorInforFailed());
        }
    };
};
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS, //FEETCH_GENDER_SUCCESS=>Unhandled Rejection (Error): Actions may not have an undefined "type" propert
    data: allRequiredData, //biến data
});
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
