import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionTypes from "../../reducers/actions";

class ShowUser extends Component {
  constructor() {
    super();
    this.state = {
      editPassword: false,
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword = () => {
    if (this.state.editPassword === false) {
      this.setState({
        editPassword: true,
      });
    } else {
      this.setState({
        editPassword: false,
      });
    }
  };
  render() {
    let displayResetPassword = null;
    if (this.state.editPassword) {
      displayResetPassword = (
        <p>
          New Password: <input name="password" onChange={(event)=> this.props.onNewPasswordInput(event.target.name, event.target.value)} />
          <button
            onClick={() =>
              this.props.onReset(this.props._id, this.props.newPassword)
            }
          >
            Save
          </button>
        </p>
      );
    }
    return (
      <div>

        <b>First Name:</b> {this.props.fname} <br />
        <b>Last Name:</b> {this.props.lname} <br />
        <b>Email:</b> {this.props.email} <br />
        <b>Password:</b> {this.props.password} <br />
        <b>Status:</b> {this.props.status} <br />
        <button onClick={this.resetPassword}>Reset Password</button>
        <button onClick={() => this.props.onActivate(this.props._id)}>
          Activate Account
        </button>
        <button onClick={() => this.props.onDeactivate(this.props._id)}>
          Deactivate Account
        </button>
        <br />
        {displayResetPassword}
        <br />
        =====================
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.productsReducer.users,
    newPassword: state.productsReducer.newPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewPasswordInput: (name, value) =>
      dispatch(actionTypes.newPasswordInput(name, value)),

    onActivate: (_id) => dispatch(actionTypes.activateUserAccount(_id)),
    onDeactivate: (_id) => dispatch(actionTypes.deactivateUserAccount(_id)),
    onReset: (_id, password) =>
      dispatch(actionTypes.resetUserPassword(_id, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
