import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionTypes from "../../reducers/actions";

import ShowProduct from "./Product";

class Products extends Component {
  componentDidMount() {
    this.props.onFetchProducts();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.onSortByReputation()}>
          Sort By Reputation Points
        </button>
        {this.props.products &&
          this.props.products.map((item) => {
            if (!item.products.reputation) {
              item.products.reputation = 0;
            }
            if (!item.products.excellent) {
              item.products.excellent = 0;
            }
            if (!item.products.good) {
              item.products.good = 0;
            }
            if (!item.products.bad) {
              item.products.bad = 0;
            }
            return (
              <ShowProduct
                key={item.products.productId}
                productId={item.products.productId}
                title={item.products.title}
                price={item.products.price}
                reputation={item.products.reputation}
                reviews={item.products.reviews}
                description={item.products.description}
                excellent={item.products.excellent}
                good={item.products.good}
                bad={item.products.bad}
                ownerId={item.products.ownerId}
                onDeleteProducts={(ownerId, productId) =>
                  this.props.onDeleteProducts(ownerId, productId)
                }
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actionTypes.fetchAllProducts()),
    onDeleteProducts: (_id, productId) =>
      dispatch(actionTypes.deleteCurProducts(_id, productId)),
    onSortByReputation: () => dispatch(actionTypes.sortByReputation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
