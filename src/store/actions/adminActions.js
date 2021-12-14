import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
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
            console.log("hoi dan it check create user: ", res);
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
            console.log("hoi dan it check create user: ", res);
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
