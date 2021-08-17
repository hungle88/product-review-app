import axios from "axios";

export const NEW_INPUT = "NEW_INPUT";

export const EDIT_INPUT = "EDIT_INPUT";

export const EDIT_REVIEW_INPUT = "EDIT_REVIEW_INPUT";
export const ADD_REVIEWS_INPUT = "ADD_REVIEWS_INPUT";
export const NEW_PASSWORD_INPUT = "NEW_PASSWORD_INPUT";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const ADD_PRODUCTS = "ADD_PRODUCTS";

export const EDIT_PRODUCTS = "EDIT_PRODUCTS";

export const DELETE_PRODUCTS = "DELETE_PRODUCTS";

export const ADD_REVIEWS = "ADD_REVIEWS";

export const DELETE_REVIEWS = "DELETE_REVIEWS";
export const EDIT_REVIEWS = "EDIT_REVIEWS";

export const EXCELLENT_RATING = "EXCELLENT_RATING";
export const GOOD_RATING = "GOOD_RATING";
export const BAD_RATING = "BAD_RATING";
export const REPUTATION_POINT = "REPUTATION_POINT";

export const REPUTATION_SORT = "REPUTATION_SORT";

export const FETCH_USERS = "FETCH_USERS";

export const RESET_PASSWORD = "RESET_PASSWORD";
export const ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT";
export const DEACTIVATE_ACCOUNT = "DEACTIVATE_ACCOUNT";

export const FETCH_LOG = "FETCH_LOG";

export const RESET_STATE = "RESET_STATE";

export const LOGIN = "LOGIN";
export const LOGIN_INPUT = "LOGIN_INPUT";

export const SIGNUP = "SIGNUP";

export const SIGNUP_INPUT = "SIGNUP_INPUT";

export const resetState = (res) => {
  return {
    type: RESET_STATE,
    value: res,
  };
};
export const loginInput = (name, value) => {
  console.log(name + ": " + value);
  return {
    type: LOGIN_INPUT,
    name: name,
    value: value,
  };
};
export const signupInput = (name, value) => {
  console.log(name + ": " + value);
  return {
    type: SIGNUP_INPUT,
    name: name,
    value: value,
  };
};
export const newInput = (name, value) => {
  // console.log(name + ": " + value);
  return {
    type: NEW_INPUT,
    name: name,
    value: value,
  };
};

export const editInput = (name, value) => {
  console.log(name + ": " + value);

  return {
    type: EDIT_INPUT,
    name: name,
    value: value,
  };
};

export const editReviewInput = (name, value) => {
  console.log(name + ": " + value);

  return {
    type: EDIT_REVIEW_INPUT,
    name: name,
    value: value,
  };
};
export const addReviewInput = (name, value) => {
  console.log(name + ": " + value);

  return {
    type: ADD_REVIEWS_INPUT,
    name: name,
    value: value,
  };
};

export const newPasswordInput = (name, value) => {
  console.log(name + ": " + value);

  return {
    type: NEW_PASSWORD_INPUT,
    name: name,
    value: value,
  };
};

export const fetchProducts = (res) => {
  return {
    type: FETCH_PRODUCTS,
    value: res,
  };
};

export const fetchAllProducts = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/users/products", {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(fetchProducts(response.data));
      });
  };
};

export const fetchUsers = (res) => {
  return {
    type: FETCH_USERS,
    value: res,
  };
};

export const fetchAllUsers = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/users/", {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(fetchUsers(response.data));
      });
  };
};

export const reputationSort = (res) => {
  return {
    type: REPUTATION_SORT,
    value: res,
  };
};

export const sortByReputation = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/users/products/sortbyreputation", {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(reputationSort(response.data));
      });
  };
};

export const addProducts = (res) => {
  return {
    type: ADD_PRODUCTS,
    value: res,
  };
};

export const addNewProducts = (_id, product) => {
  return function (dispatch) {
    axios
      .post("http://localhost:4000/users/" + _id + "/products", product, {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        dispatch(addProducts(response.data));
        dispatch(resetState());

        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editProducts = (res) => {
  return {
    type: EDIT_INPUT,
    value: res,
  };
};

export const editCurProducts = (ownerId, productId, product) => {
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" + ownerId + "/product/" + productId,
        product,
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        console.log(product);
        dispatch(editProducts(response.data));
        dispatch(resetState());
        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProducts = (res) => {
  return {
    type: DELETE_PRODUCTS,
    value: res,
  };
};

export const deleteCurProducts = (ownerId, productId) => {
  console.log("delete");
  return function (dispatch) {
    axios
      .delete("http://localhost:4000/users/" + ownerId + "/product/" + productId, {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        dispatch(deleteProducts(response.data));
        dispatch(fetchAllProducts());
      });
  };
};

export const addReviews = (res) => {
  return {
    type: ADD_REVIEWS,
    value: res,
  };
};

export const addNewReviews = (_id, productId, review) => {
  // console.log(review);
  // console.log(localStorage.username)
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" +
          _id +
          "/product/" +
          productId +
          "/reviews",
        review,
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        dispatch(addReviews(response.data));
        dispatch(resetState());

        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteReviews = (res) => {
  return {
    type: DELETE_REVIEWS,
    value: res,
  };
};

export const deleteCurReviews = (ownerId, reviewId) => {
  return function (dispatch) {
    axios
      .delete(
        "http://localhost:4000/users/" + ownerId + "/reviews/" + reviewId,
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        console.log(reviewId);
        console.log(ownerId);

        dispatch(deleteReviews(response.data));
        dispatch(fetchAllProducts());
      });
  };
};

export const editReviews = (res) => {
  return {
    type: EDIT_REVIEWS,
    value: res,
  };
};

export const editCurReviews = (_id, reviewId, review) => {
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" + _id + "/reviews/" + reviewId,
        review,
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        console.log(reviewId);

        dispatch(editReviews(response.data));

        dispatch(fetchAllProducts());
        dispatch(resetState());
      });
  };
};

export const reputationPoint = (res) => {
  return {
    type: REPUTATION_POINT,
    value: res,
  };
};

export const computeReputation = (ownerId, productId) => {
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" +
          ownerId +
          "/products/" +
          productId +
          "/reputation",
        {},
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        dispatch(reputationPoint(response.data));
        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const rateExcellent = (res) => {
  return {
    type: EXCELLENT_RATING,
    value: res,
  };
};

export const addExcellent = (_id, ownerId, productId) => {
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" +
          _id +
          "/products/" +
          productId +
          "/excellent",
        {},
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        dispatch(rateExcellent(response.data));
        dispatch(computeReputation(ownerId, productId));

        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const rateGood = (res) => {
  return {
    type: GOOD_RATING,
    value: res,
  };
};

export const addGood = (_id, productId) => {
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" +
          _id +
          "/products/" +
          productId +
          "/good",
        {},
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        dispatch(rateGood(response.data));

        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const rateBad = (res) => {
  return {
    type: BAD_RATING,
    value: res,
  };
};

export const addBad = (_id, ownerId, productId) => {
  return function (dispatch) {
    axios
      .put(
        "http://localhost:4000/users/" +
          _id +
          "/products/" +
          productId +
          "/bad",
        {},
        {
          headers: { Authorization: localStorage.token },
        }
      )
      .then((response) => {
        dispatch(rateBad(response.data));
        dispatch(computeReputation(ownerId, productId));
        dispatch(fetchAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetPassword = (res) => {
  return {
    type: RESET_PASSWORD,
    value: res,
  };
};

export const resetUserPassword = (_id, password) => {
  return function (dispatch) {
    axios
      .put("http://localhost:4000/users/" + _id + "/password", password, {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        dispatch(resetPassword(response.data));
        dispatch(fetchAllUsers());
        dispatch(resetState());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const activateAccount = (res) => {
  return {
    type: ACTIVATE_ACCOUNT,
    value: res,
  };
};

export const activateUserAccount = (_id) => {
  return function (dispatch) {
    axios
      .put("http://localhost:4000/users/" + _id + "/activate", {},{
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        dispatch(activateAccount(response.data));
        dispatch(fetchAllUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deactivateAcount = (res) => {
  return {
    type: DEACTIVATE_ACCOUNT,
    value: res,
  };
};

export const deactivateUserAccount = (_id) => {
  return function (dispatch) {
    axios
      .put("http://localhost:4000/users/" + _id + "/deactivate",{}, {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        dispatch(deactivateAcount(response.data));
        dispatch(fetchAllUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchLog = (res) => {
  return {
    type: FETCH_LOG,
    value: res,
  };
};

export const fetchLogSuccess = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/log", {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(fetchLog(response.data));
      });
  };
};

export const login = (res) => {
  return {
    type: LOGIN,
    value: res,
  };
};

export const loginSuccess = (account) => {
  return function (dispatch) {
    axios
      .post("http://localhost:4000/auth/login", account, {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem("loginStatus", response.data.status);

        localStorage.setItem("token", response.data.result);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("username", response.data.fname);

        localStorage.setItem("role", response.data.role);
        // console.log(localStorage.username);
        dispatch(login(response.data));
        dispatch(resetState());

      })

      .catch((err) => {
        console.log(err);
      });
  };
};

export const signup = (res) => {
  return {
    type: SIGNUP,
    value: res,
  };
};

export const signupSuccess = (account) => {
  return function (dispatch) {
    axios
      .post("http://localhost:4000/auth/signup", account, {
        headers: { Authorization: localStorage.token },
      })
      .then((response) => {
        dispatch(signup(response.data));
        dispatch(resetState());

      })
      .catch((err) => {
        console.log(err);
      });
  };
};
