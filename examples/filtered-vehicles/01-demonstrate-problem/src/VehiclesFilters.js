import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styled from "styled-components";

import Select from "./Select";
import * as actions from "./actions";
import withVehiclesRouter from "./withVehiclesRouter";

class VehiclesFilters extends React.Component {
  componentDidMount() {
    this._fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this._fetchData();
    }
  }

  _fetchData() {
    const { dispatch, query } = this.props;
    dispatch(actions.fetchModels(query.make));
  }

  render() {
    const { changeQuery, models, query } = this.props;
    return (
      <Container>
        <Select
          label="Make"
          onChange={e =>
            changeQuery({ make: e.currentTarget.value, model: "" })
          }
          options={["All makes", "Acura", "BMW", "Cadillac"]}
          value={query.make || ""}
        />
        {query.make && (
          <Select
            label="Model"
            onChange={e => changeQuery({ model: e.currentTarget.value })}
            options={["All models", ...models]}
            value={query.model || ""}
          />
        )}
      </Container>
    );
  }
}

export default compose(
  withVehiclesRouter,
  connect(state => ({ models: state.models })),
)(VehiclesFilters);

const Container = styled.div`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 10px;
  padding: 14px 22px 60px 14px;
  width: 250px;
`;
