/* @flow */
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

class MyComponentThatFetches extends Component {
  componentDidUpdate() {
    const { a, dispatch } = this.props;
    dispatch(actions.fetchSomething1(a));
    dispatch(actions.memoizedFetchSomething2(a));
  }

  render() {
    return <div />;
  }
}

const MyComponentThatFetchesContainer = connect()(MyComponentThatFetches);

class HomeApp extends Component {
  state = {
    a: 0,
    b: 0,
  };

  render() {
    const { count1, count2 } = this.props;
    const { a, b } = this.state;

    return (
      <div>
        <h2>Basic example</h2>
        <p>Open the developer tools console in the browser to view logging</p>
        <button onClick={() => this.setState({ a: a + 1 })}>Change prop a</button>
        <button onClick={() => this.setState({ b: b + 1 })}>Change prop b</button>
        <hr />
        <div>
          <div>Prop a: {a}</div>
          <div>Prop b: {b}</div>
          <div>Un-memoized fetch count: {count1}</div>
          <div>Memoized fetch count: {count2}</div>
        </div>
        <MyComponentThatFetchesContainer a={a} b={b} />
      </div>
    );
  }
}

const HomeAppContainer = connect(state => ({
  count1: state.count1,
  count2: state.count2,
}))(HomeApp);

export default HomeAppContainer;
