import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Spinner from "./Spinner";
import VehicleCard from "./VehicleCard";
import * as actions from "./actions";
import withVehiclesRouter from "./withVehiclesRouter";

class VehicleDetail extends React.Component {
  componentDidMount() {
    const { dispatch, vehicleId } = this.props;
    dispatch(actions.fetchVehicle(vehicleId));
  }

  render() {
    const { isLoading, vehicle } = this.props;
    return isLoading ? <Spinner /> : <VehicleCard {...vehicle} />;
  }
}

export default compose(
  withVehiclesRouter,
  connect(state => ({
    isLoading: state.isLoading,
    vehicle: state.vehicle,
  })),
)(VehicleDetail);
