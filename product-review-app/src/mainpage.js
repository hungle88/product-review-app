import React from "react";
import { Link, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Products from "./containers/Products/Products";
import AddProducts from "./containers/Products/addProducts";
import Users from "./containers/Users/Users";
import Logs from "./containers/Logs/Logs";
import * as actionTypes from "./reducers/actions";
import { connect } from "react-redux";

function MainPage(props) {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("loginStatus");

    history.push("/");
    window.location.reload();
  };

  let displayLogUser = (
    <div>
      <ul>
        For admin only:
        <li>
          <Link to="/mainpage/logs"> Log List </Link>
        </li>
        <li>
          <Link to="/mainpage/users"> User List </Link>
        </li>
      </ul>
    </div>
  );

  if (localStorage.role !== "superuser") {
    displayLogUser = null;
  }

  let userDisplay = (
    <div>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => history.push("/mainpage")}>Back</button>{" "}
      <ul>
        <li>
          <Link to="/mainpage/products"> Show Product List </Link>
        </li>
        <li>
          <Link to="/mainpage/add_product"> Add New Product </Link>
        </li>
      </ul>
    </div>
  );

  if (localStorage.role !== "user" && localStorage.role !== "superuser") {
    userDisplay = (
      <p>
        <button onClick={() => logout()}>Close</button>
        <br />
        *Please enter your correct email and password
      </p>
    );
  }
  return (
    <div>
      {userDisplay}

      {displayLogUser}
      <Switch>
        <Route path="/mainpage/products" render={(props) => <Products />} />
        <Route
          path="/mainpage/add_product"
          render={(props) => <AddProducts />}
        />

        <Route
          path="/mainpage/logs"
          render={(props) =>
            localStorage.role !== "superuser" ? (
              <Redirect to="/mainpage" />
            ) : (
              <Logs />
            )
          }
        />
        <Route
          path="/mainpage/users"
          render={(props) =>
            localStorage.role !== "superuser" ? (
              <Redirect to="/mainpage" />
            ) : (
              <Users />
            )
          }
        />
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
    onSignupInput: (name, val) => dispatch(actionTypes.signupInput(name, val)),
    onSignup: (account) => dispatch(actionTypes.signupSuccess(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
