import qs from "query-string";
import * as React from "react";
import { withRouter } from "react-router-dom";

function withVehiclesRouter(BaseComponent) {
  class WithVehiclesRouter extends React.Component {
    render() {
      const { location, match } = this.props;
      return (
        <BaseComponent
          {...this.props}
          changeQuery={this._changeQuery}
          query={qs.parse(location.search)}
          vehicleId={parseInt(match.params.vehicleId, 10)}
        />
      );
    }

    _changeQuery = params => {
      const { history, location } = this.props;
      const currentParams = qs.parse(location.search);
      const newParams = { ...currentParams, ...removeFalseyValues(params) };
      history.push({ search: qs.stringify(newParams) });
    };
  }

  return withRouter(WithVehiclesRouter);
}

export default withVehiclesRouter;

function removeFalseyValues(params) {
  return Object.entries(params).reduce(
    (memo, [key, value]) => ({ ...memo, [key]: value || undefined }),
    {},
  );
}
