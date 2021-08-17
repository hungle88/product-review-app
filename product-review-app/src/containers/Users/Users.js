import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionTypes from "../../reducers/actions";

import ShowUser from "./User";

class Users extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    return (
      <div>
        {this.props.users &&
          this.props.users.map((item) => {
        
            return (
              <ShowUser
                key={item._id}
                _id={item._id}
                fname={item.fname}
                lname={item.lname}
                email={item.email}
                password={item.password}
                status={item.status}
     
                
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.productsReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(actionTypes.fetchAllUsers()),
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
