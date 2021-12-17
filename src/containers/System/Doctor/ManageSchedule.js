import React, { Component } from "react";
import { connect } from "react-redux";

class ManagaSchedule extends Component {
    render() {
        return (
            <React.Fragment>
                <div>Manage schedule</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagaSchedule);
