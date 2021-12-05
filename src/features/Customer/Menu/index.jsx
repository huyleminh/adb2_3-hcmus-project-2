import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "../../Errors/404";
import ProductDetail from "./Detail";
import ViewListFeature from "./List";

MenuFeature.propTypes = {};

function MenuFeature(props) {
    const match = useRouteMatch();

    return (
        <Switch>
            <Redirect exact from={`${match.path}`} to={`${match.path}/categories`} />
            <Route path={`${match.path}/products/:id`} component={ProductDetail} />
            <Route exact path={`${match.path}/categories`} component={ViewListFeature} />
            <Route>
                <Redirect to="/404">
                    <NotFound />
                </Redirect>
            </Route>
        </Switch>
    );
}

export default MenuFeature;
