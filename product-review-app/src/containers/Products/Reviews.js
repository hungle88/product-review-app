import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionTypes from "../../reducers/actions";

import EditReviews from "./editReviews";

 class Reviews extends Component {


    constructor() {
        super();
        this.state = {
          editReview: false,
        };
        this.editReview = this.editReview.bind(this);
      }
    
      editReview = () => {
        if (this.state.editReview === false) {
          this.setState({
            editReview: true,
          });
        } else {
          this.setState({
            editReview: false,
          });
        }
      };



  render() {

    let displayEditReview = null;
    if (this.state.editReview) {
      displayEditReview = (
        <EditReviews
          reviewId={this.props.reviewId}
          fname={this.props.fname}
          content={this.props.content}
        />
      );
    }



    return (
      <div>
        <b>Name:</b> {this.props.fname} <br />
        <b>Review Content:</b> {this.props.content} <br />
        <button
          onClick={() => {
            this.props.onDeleteReviews(
                this.props.ownerId,
              this.props.reviewId
            );
          }}
        >
          Delete
        </button>
        <button onClick={this.editReview}>Edit</button>
        <br />
        {displayEditReview}
        -----
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      products: state.productsReducer.products,
      newReview: state.productsReducer.newReview,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onFetchProducts: () => dispatch(actionTypes.fetchAllProducts()),
     
  
      onDeleteReviews: (_id,reviewId) => dispatch(actionTypes.deleteCurReviews(_id,reviewId)),
  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Reviews);