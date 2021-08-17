import React, { Component } from "react";
import * as actionTypes from "../../reducers/actions";
import { connect } from "react-redux";

class EditProducts extends Component {
  componentDidUpdate(){
    if(!this.props.editProduct.title)this.props.editProduct.title = this.props.title;
    if(!this.props.editProduct.price)this.props.editProduct.price = this.props.price;
    if(!this.props.editProduct.description)this.props.editProduct.description = this.props.description;

  }
  render() {
    let warning =null;
    if(localStorage.userId !== this.props.ownerId){
      warning=<p>*You are unable allowed to edit this product.</p>
    }
    return (
      <div>
        {warning}
        Title: <br />
        <input
          type="text"
          name="title"
          defaultValue={this.props.title}
          onChange={(event) => {
            this.props.onChange(event.target.name, event.target.value);
          }}
        />
        <br />
        Price: <br />
        <input
          type="number"
          name="price"
          defaultValue={this.props.price}
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
          defaultValue={this.props.description}
          onChange={(event) => {
            this.props.onChange(event.target.name, event.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            this.props.onEditProducts(
              this.props.ownerId,
              this.props.productId,
              this.props.editProduct
            );
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    editProduct: state.productsReducer.editProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name, val) => dispatch(actionTypes.editInput(name, val)),
    onEditProducts: (_id, productId, product) =>
      dispatch(actionTypes.editCurProducts(_id, productId, product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts);
