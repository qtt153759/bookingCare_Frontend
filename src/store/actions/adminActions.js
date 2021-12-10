import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FEETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
    //nếu không return 1 function thì error:Unhandled Rejection (Error):Actions must be plain objects
    return async (dispatch, getState) => {
        try {
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
