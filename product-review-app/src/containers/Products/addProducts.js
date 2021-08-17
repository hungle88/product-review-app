import React, { Component } from "react";
import * as actionTypes from "../../reducers/actions";
import { connect } from "react-redux";

class AddProducts extends Component {
  render() {
    return (
      <div>
        <form>
        Title: <br />
        <input
          type="text"
          name="title"
          value={this.props.title}
          onChange={(event) => {
            this.props.onChange(event.target.name, event.target.value);
          }}
        />
        <br />
        Price: <br />
        <input
          type="number"
          name="price"
          value={this.props.price}
          onChange={(event) => {
            this.props.onChange(event.target.name, event.target.value);
          }}
        />
        <br />
        Description:
        <br />
        <textarea
          type="text"
          name="description"
          value={this.props.description}
          onChange={(event) => {
            this.props.onChange(event.target.name, event.target.value);
          }}
        />
        <br />
        <button type = "submit"
          onClick={() => {
            this.props.onAddProducts(
              localStorage.userId,
              this.props.newProduct
            );
          }}
        >
          Add Product
        </button>
        {/* <button onClick={()=>{console.log(this.props.newProduct)}}>Add Product</button> */}
      </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    newProduct: state.productsReducer.newProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name, val) => dispatch(actionTypes.newInput(name, val)),
    onAddProducts: (_id, product) =>
      dispatch(actionTypes.addNewProducts(_id, product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
