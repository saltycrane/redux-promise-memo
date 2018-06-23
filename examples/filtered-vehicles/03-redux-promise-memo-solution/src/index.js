import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import HomePage from "./HomePage";
import Layout from "./Layout";
import VehicleDetail from "./VehicleDetail";
import VehiclesFilters from "./VehiclesFilters";
import VehiclesList from "./VehiclesList";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(thunk, promiseMiddleware()));

const VehiclesPage = () => (
  <React.Fragment>
    <VehiclesFilters />
    <VehiclesList />
  </React.Fragment>
);

const VehicleDetailPage = VehicleDetail;

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route component={VehicleDetailPage} path="/vehicles/:vehicleId" />
          <Route component={VehiclesPage} path="/vehicles" />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
