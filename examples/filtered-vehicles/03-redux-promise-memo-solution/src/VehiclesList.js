import React from "react";
import { connect } from "react-redux";
import { Link as Link_ } from "react-router-dom";
import { compose } from "redux";
import styled from "styled-components";

import Spinner from "./Spinner";
import VehicleCard from "./VehicleCard";
import * as actions from "./actions";
import withVehiclesRouter from "./withVehiclesRouter";

class VehiclesList extends React.Component {
  componentDidMount() {
    this._fetchData();
  }

  componentDidUpdate(prevProps) {
    this._fetchData();
  }

  _fetchData() {
    const { dispatch, query } = this.props;
    dispatch(actions.memoizedFetchVehicles(query));
  }

  render() {
    const { isLoading, vehicles } = this.props;
    return (
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          vehicles.map(vehicle => (
            <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`}>
              <VehicleCard {...vehicle} />
            </Link>
          ))
        )}
      </Container>
    );
  }
}

export default compose(
  withVehiclesRouter,
  connect(state => ({
    isLoading: state.isLoading,
    vehicles: state.vehicles,
  })),
)(VehiclesList);

const Container = styled.div`
  width: 500px;
`;
const Link = styled(Link_)`
  text-decoration: none;
`;
