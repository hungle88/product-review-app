import React, { Component } from "react";
import * as actionTypes from "./reducers/actions";
import { connect } from "react-redux";
import { Link, Route, Switch, useHistory, Redirect } from "react-router-dom";
import MainPage from "./mainpage";

function SignupPage(props) {
  const history = useHistory();
  const submit = () => {
    props.onSignup(props.signupInput);
    history.push("/");

    window.location.reload();
  };

  return (
    <div>
      ============
      <br /> Sign Up Form
      <br /> ============ <br />
      First Name:
      <br />
      <input
        type="text"
        name="fname"
        placeholder="your firstname"
        value={props.fname}
        onChange={(event) => {
          props.onSignupInput(event.target.name, event.target.value);
        }}
      />
      <br />
      Last Name:
      <br />
      <input
        type="text"
        name="lname"
        placeholder="your lastname"
        value={props.lname}
        onChange={(event) => {
          props.onSignupInput(event.target.name, event.target.value);
        }}
      />
      <br />
      Email: <br />
      <input
        type="text"
        name="email"
        placeholder="example@email.com"
        value={props.email}
        onChange={(event) => {
          props.onSignupInput(event.target.name, event.target.value);
        }}
      />
      <br />
      Password:
      <br />
      <input
        type="text"
        name="password"
        placeholder="your password"
        value={props.password}
        onChange={(event) => {
          props.onSignupInput(event.target.name, event.target.value);
        }}
      />
      <br />
      <button onClick={submit}>Submit</button><button onClick={() => history.push("/")}>Close</button>

      {/* <Switch>
        <Route path="/mainpage" render={(props) => <MainPage />} />
      </Switch> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    signupInput: state.productsReducer.signupInput,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignupInput: (name, val) => dispatch(actionTypes.signupInput(name, val)),
    onSignup: (account) => dispatch(actionTypes.signupSuccess(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
