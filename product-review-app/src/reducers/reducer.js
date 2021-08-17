import * as actionTypes from "./actions";
const initialState = {
  users: [],
  products: [],
  newProduct: {},
  editProduct: {},
  newReview: {},
  editReview: {},
  newPassword: {},
  logs: [],
  loginInput: {},
  signupInput: { role: "user" },
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.LOGIN_INPUT) {
    return {
      ...state,
      loginInput: { ...state.loginInput, [action.name]: action.value },
    };
  }

  if (action.type === actionTypes.SIGNUP_INPUT) {
    return {
      ...state,
      signupInput: { ...state.signupInput, [action.name]: action.value },
    };
  }

  if (action.type === actionTypes.FETCH_PRODUCTS) {
    return {
      ...state,
      products: action.value,
    };
  }
  if (action.type === actionTypes.FETCH_USERS) {
    return {
      ...state,
      users: action.value,
    };
  }
  if (action.type === actionTypes.FETCH_LOG) {
    return {
      ...state,
      logs: action.value,
    };
  }
  if (action.type === actionTypes.RESET_STATE) {
    return {
      ...state,
      newProduct: {},
      editProduct: {},
      newReview: {},
      editReview: {},
      newPassword: {},
    };
  }
  if (action.type === actionTypes.REPUTATION_SORT) {
    return {
      ...state,
      products: action.value,
    };
  }
  if (action.type === actionTypes.NEW_INPUT) {
    return {
      ...state,
      newProduct: { ...state.newProduct, [action.name]: action.value },
    };
  }

  if (action.type === actionTypes.EDIT_INPUT) {
    return {
      ...state,
      editProduct: { ...state.editProduct, [action.name]: action.value },
    };
  }
  if (action.type === actionTypes.ADD_REVIEWS_INPUT) {
    return {
      ...state,
      newReview: { ...state.newReview, [action.name]: action.value },
    };
  }

  if (action.type === actionTypes.EDIT_REVIEW_INPUT) {
    return {
      ...state,
      editReview: { ...state.editReview, [action.name]: action.value },
    };
  }
  if (action.type === actionTypes.NEW_PASSWORD_INPUT) {
    return {
      ...state,
      newPassword: { ...state.newPassword, [action.name]: action.value },
    };
  }

  if (action.type === actionTypes.EDIT_PRODUCTS) {
    return {
      ...state,
      editProduct: {},
    };
  }

  if (action.type === actionTypes.ADD_PRODUCTS) {
    return {
      ...state,
      newProduct: {},
    };
  }

  if (action.type === actionTypes.DELETE_PRODUCTS) {
    return {
      products: state.products.filter((item) => {
        return item.products.productId !== action.productId;
      }),
    };
  }

  if (action.type === actionTypes.DELETE_REVIEWS) {
    let copyOfState = { ...state };
    copyOfState.products.map((item) => {
      if (item.products.reviews) {
        item.products.reviews.filter((review) => {
          return review.reviewId !== action.reviewId;
        });
      } else {
        return item;
      }
      // return copyOfState.products;
    });

    return {
      ...state,
      products: copyOfState.products,
    };
  }

  if (action.type === actionTypes.ADD_REVIEWS) {
    return {
      ...state,
      newReview: {},
    };
  }

  if (action.type === actionTypes.EDIT_REVIEWS) {
    return {
      ...state,
      // editReview: {},
    };
  }

  if (action.type === actionTypes.EXCELLENT_RATING) {
    return {
      ...state,
    };
  }

  if (action.type === actionTypes.GOOD_RATING) {
    return {
      ...state,
    };
  }
  if (action.type === actionTypes.BAD_RATING) {
    return {
      ...state,
    };
  }

  if (action.type === actionTypes.REPUTATION_POINT) {
    return {
      ...state,
    };
  }

  if (action.type === actionTypes.ACTIVATE_ACCOUNT) {
    return {
      ...state,
    };
  }

  if (action.type === actionTypes.DEACTIVATE_ACCOUNT) {
    return {
      ...state,
    };
  }

  if (action.type === actionTypes.LOGIN) {
    return {
      ...state,
      loginInput: {},
    };
  }

  if (action.type === actionTypes.SIGNUP) {
    return {
      ...state,
      signupInput: {},
    };
  }

  return state;
};

export default reducer;
