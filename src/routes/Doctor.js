import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import Header from "../containers/Header/Header";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {/* Thay vì tạo thêm 1 div để bọc cho hàm return thì chúng ta dùng React.Fragment trong suốt, giúp đỡ quả quan tâm cái div ngoài cùng */}
                {/*every time check loggin we have header*/}
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {/* Switch đây giúp chọn component thông qua Rout path */}
                        <Switch>
                            <Route
                                path="/doctor/manage-schedule" //vào link này thì sẽ mở component này
                                component={ManageSchedule}
                            />
                            <Route
                                path="/doctor/manage-patient" //vào link này thì sẽ mở component này
                                component={ManagePatient}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
