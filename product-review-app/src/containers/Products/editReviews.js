import React, { Component } from "react";
import * as actionTypes from "../../reducers/actions";
import { connect } from "react-redux";

class EditReviews extends Component {
  componentDidUpdate(){
    if(this.props.editReview){

    if(this.props.editReview.fname !== localStorage.username){
      this.props.editReview.fname = localStorage.username
    }}
  }
  render() {
    let warning =null;
    if(localStorage.username !== this.props.fname){
      warning=<p>*You are unable to edit this product.</p>
    }
    return (
      <div>
        {warning}
        <form>
        {/* Name: <br />
        <input
          type="text"
          name="name"
          defaultValue={this.props.fname}
          onChange={(event) => {
            this.props.onEditReviewInput(event.target.name, event.target.value);
          }}
        />
        <br /> */}
        New Review Content: <br />
        <textarea
          type="text"
          name="content"
          defaultValue={this.props.content}
          onChange={(event) => {
            this.props.onEditReviewInput(event.target.name, event.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            this.props.onEditReviews(
                localStorage.userId,
              this.props.reviewId,
              this.props.editReview
            );
          }}
        >
          Save
        </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    editReview: state.productsReducer.editReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditReviewInput: (name, val) => dispatch(actionTypes.editReviewInput(name, val)),
    onEditReviews: (_id, reviewId, review) =>
      dispatch(actionTypes.editCurReviews(_id, reviewId, review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReviews);
