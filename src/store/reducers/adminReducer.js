import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
};

const adminReducer = (state = initialState, action) => {
    //state=initialState
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            console.log("getch gender start: ", action);
            return {
                ...state, //reducer map vào state
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            console.log("getch gender success: ", action);
            return {
                ...state, //với redux thì edit thẳng biến state này thì ko sao
            };
        case actionTypes.FETCH_GENDER_FAILED:
            console.log("getch gender failed: ", action);
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state, //reducer map vào state
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state, //với redux thì edit thẳng biến state này thì ko sao
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state, //reducer map vào state
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state, //với redux thì edit thẳng biến state này thì ko sao
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state, //reducer map vào state
            };

        default:
            return state; //mặc định là trả về state
    }
};

export default adminReducer;
