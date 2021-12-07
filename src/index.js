import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.scss";

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from "react-redux";
import reduxStore, { persistor } from "./redux";

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            {/*reduxStore nơi lưu thông tin của redux  */}
            <IntlProviderWrapper>
                <App persistor={persistor} />
                {/*persistor giúp lưu trữ 1 biến của redux ko khác gì local store*/}
                {/* index là file đầu tiên chạy sau đó nó chạy vào App */}
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById("root") //tất cả đều được reder vào root
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
