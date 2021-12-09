import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
    //setup config
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const userPersistConfig = {
    //setup config
    ...persistCommonConfig,
    key: "user",
    whitelist: ["isLoggedIn", "userInfo"], //neu login thanh cong thi thong tin dc luu o local storage
};
const appPersistConfig = {
    //setup config
    ...persistCommonConfig,
    key: "app",
    whitelist: ["language"],
};
export default (history) =>
    combineReducers({
        //tạo các persistReducer trong combineReducer,để vào redux.js store
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer), //theo công thức persistReducer(persistConfig, rootReducer)
        app: persistReducer(appPersistConfig, appReducer),
    });
