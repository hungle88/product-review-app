import React, { Component } from "react";
import * as actionTypes from "./reducers/actions";
import { connect } from "react-redux";
import { Link, Route, Switch, useHistory, Redirect } from "react-router-dom";
import MainPage from "./mainpage";
import SignupPage from "./signupPage";

function LoginPage(props) {
  const history = useHistory();
  const login = () => {
    props.onLogin(props.loginInput);

    history.push("/mainpage");
  };
  let display = (
    <p>
      Email: <br />
      <input
        type="text"
        name="email"
        placeholder="example@email.com"
        value={props.email}
        onChange={(event) => {
          props.onLoginInput(event.target.name, event.target.value);
        }}
      ></input>
      <br />
      Password:
      <br />
      <input
        type="text"
        name="password"
        placeholder="your password"
        value={props.password}
        onChange={(event) => {
          props.onLoginInput(event.target.name, event.target.value);
        }}
      ></input>
      <br />
      <button onClick={login}>Login</button>
      <button onClick={() => history.push("/signup")}>Signup</button>
    </p>
  );

  if (localStorage.loginStatus === "success") {
    display = null;
  }
  return (
    <div>
      {display}
      <Switch>
        <Route path="/mainpage" render={(props) => <MainPage />} />
        <Route path="/signup" render={(props) => <SignupPage />} />

      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginInput: state.productsReducer.loginInput,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginInput: (name, val) => dispatch(actionTypes.loginInput(name, val)),
    onLogin: (account) => dispatch(actionTypes.loginSuccess(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
