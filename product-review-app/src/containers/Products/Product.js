import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionTypes from "../../reducers/actions";
import EditProducts from "./editProducts";
import Reviews from "./Reviews";

class ShowProduct extends Component {
  constructor() {
    super();
    this.state = {
      editInput: false,
      showReviews: false,
    };
    this.editProduct = this.editProduct.bind(this);
    this.showReviews = this.showReviews.bind(this);
  }
componentDidUpdate(){
  if(this.props.newReview){
  if(this.props.newReview.fname !== localStorage.username){
    this.props.newReview.fname = localStorage.username
  }}
}
  editProduct = () => {
    if (this.state.editInput === false) {
      this.setState({
        editInput: true,
      });
    } else {
      this.setState({
        editInput: false,
      });
    }
  };
  showReviews = () => {
    if (this.state.showReviews === false) {
      this.setState({
        showReviews: true,
      });
    } else {
      this.setState({
        showReviews: false,
      });
    }
  };
  render() {
    let displayEdit = null;
    if (this.state.editInput) {
      displayEdit = (
        <EditProducts
          productId={this.props.productId}
          title={this.props.title}
          price={this.props.price}
          description={this.props.description}
          ownerId={this.props.ownerId}
        />
      );
    }
    let displayReviews = null;
    let displayReviewInput = null;
    if (this.state.showReviews) {
      if (this.props.reviews) {
        displayReviewInput = (
          <p>
            Post your review here: <br />
           <b>{localStorage.username}: </b>
            <br />
            <textarea
              type="text"
              name="content"
              // value={this.props.fname}
              onChange={(event) => {
                this.props.onNewReviewsInput(
                  event.target.name,
                  event.target.value
                );
              }}
            />
            <br />
            <button
              onClick={() => {
                this.props.onAddReviews(
                  localStorage.userId,
                  this.props.productId,
                  this.props.newReview
                );
              }}
            >
              Send
            </button>
          </p>
        );
        displayReviews =
          this.props.reviews &&
          this.props.reviews.map((item) => {
            return (
              <Reviews
                key={item.reviewId}
                reviewId={item.reviewId}
                fname={item.fname}
                content={item.content}
                ownerId={this.props.ownerId}
                // onDeleteReviews={(_id, reviewId) =>
                //   this.props.onDeleteReviews(_id, reviewId)
                // }
              />
            );
          });
      } else {
        displayReviewInput = (
          <p>
            Post your review here: <br />
            <input
              type="hidden"
              name="fname"
              // value={this.props.fname}
              onChange={(event) => {
                this.props.onNewReviewsInput(
                  event.target.name,
                  event.target.value
                );
              }}
            />
            <br />
            <textarea
              type="text"
              name="content"
              // value={this.props.fname}
              onChange={(event) => {
                this.props.onNewReviewsInput(
                  event.target.name,
                  event.target.value
                );
              }}
            />
            <br />
            <button
              onClick={() => {
                this.props.onAddReviews(
                  localStorage.userId,
                  this.props.productId,
                  this.props.newReview
                );
              }}
            >
              Send
            </button>
          </p>
        );
        displayReviews = <p>This product doesn't have any reviews</p>;
      }
    }
    return (
      <div>
        <br/>
        <b>Name:</b> {this.props.title} <br />
        <b>Price:</b> ${this.props.price} <br />
        <b>Reputation Point:</b> {this.props.reputation} <br />
        <b>Description:</b> {this.props.description} <br />
        <button onClick={this.showReviews}>Show Reviews</button>
        <button
          onClick={() => {
            this.props.onDeleteProducts(
              this.props.ownerId,
              this.props.productId
            );
          }}
        >
          Delete Product
        </button>
        <button onClick={this.editProduct}>Edit Product</button>
        <br />
        <b>Rating: </b> {this.props.excellent} Excellent, {this.props.good} Good, {this.props.bad} Bad<br/>
        <button      onClick={() => {
            this.props.onAddExcllent(
              localStorage.userId,this.props.ownerId,
              this.props.productId
            );
          }}>Excellent</button>
        <button      onClick={() => {
            this.props.onAddGood(
              localStorage.userId, 
              this.props.productId
            );
          }}>Good</button>
        <button      onClick={() => {
            this.props.onAddBad(
              localStorage.userId, this.props.ownerId,
              this.props.productId
            );
          }}>Bad</button>
        <br />
        {displayEdit}
        {displayReviewInput}
        {displayReviews}
        <br/>
        ==========================================
     
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
    onNewReviewsInput: (name, value) =>
      dispatch(actionTypes.addReviewInput(name, value)),

    onAddReviews: (_id, productId, review) =>
      dispatch(actionTypes.addNewReviews(_id, productId, review)),
onAddExcllent: (_id,ownerId, productId) => dispatch(actionTypes.addExcellent(_id,ownerId, productId)),
onAddGood: (_id,ownerId, productId) => dispatch(actionTypes.addGood(_id,ownerId, productId)),
onAddBad: (_id,ownerId, productId) => dispatch(actionTypes.addBad(_id,ownerId, productId))



};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProduct);
