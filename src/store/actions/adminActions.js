import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
} from "../../services/userService";
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
                dispatch(saveUserSuccess());
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
    type: "CREATE_USER_SUCCESS",
});
export const saveUserFailed = () => ({
    type: "CREATE_USER_FAILED",
});
