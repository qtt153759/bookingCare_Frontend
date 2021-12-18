import actionTypes from "../actions/actionTypes";

//đây là các biến của Redux
const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctors: [],
    allScheduleTime: [],
};

const adminReducer = (state = initialState, action) => {
    //state=initialState
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state, //reducer map vào state
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state, //với redux thì edit thẳng biến state này thì ko sao
            };
        case actionTypes.FETCH_GENDER_FAILED:
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
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            };
        default:
            return state; //mặc định là trả về state
    }
};

export default adminReducer;
