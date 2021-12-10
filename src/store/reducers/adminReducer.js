import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    position: [],
};

const adminReducer = (state = initialState, action) => {
    //state=initialState
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log("getch gender start: ", action);
            return {
                ...state, //reducer map vào state
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            console.log("getch gender success: ", action);
            return {
                ...copyState, //không nên return{...state}, nên dùng return {...copyState}
            };
        case actionTypes.FETCH_GENDER_FAILED:
            console.log("getch gender failed: ", action);
            return {
                ...state, //reducer map vào state
            };

        default:
            return state; //mặc định là trả về state
    }
};

export default adminReducer;
