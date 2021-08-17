import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionTypes from "../../reducers/actions";


class Logs extends Component {
  componentDidMount() {
    this.props.onFetchLogs();
  }

  render() {
    return (
      <div>
        {this.props.logs}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logs: state.productsReducer.logs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLogs: () => dispatch(actionTypes.fetchLogSuccess()),
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
