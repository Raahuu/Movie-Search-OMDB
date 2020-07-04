import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import SearchSection from "../containers/SearchSection";
import MovieDetails from "../containers/MovieDetails";

const AllRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/search" component={SearchSection} />
        <Route path="/movie/:imdbID/:name" component={MovieDetails} />
        <Redirect path="/" to="/search" />
      </Switch>
      <NotificationContainer />
    </>
  );
};

export default AllRoutes;
