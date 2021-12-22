import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppFooter from "../../components/Footer";
import AppHeader from "../../components/Header";
import NotFound from "../Errors/404";
import CartFeature from "./Cart";
import CheckoutFeature from "./Checkout";
import MenuFeature from "./Menu";
import ProfileFeature from "./Profile";
import "./styles.css"

CustomerFeature.propTypes = {};

function CustomerFeature(props) {
    return (
        <Layout>
            <AppHeader/>

            <Layout.Content className="app-main">
                <Switch>
                    <Redirect exact from="/" to="/menu" />

                    <Route path={`/menu`} component={MenuFeature} />
                    <Route path="/profile" component={ProfileFeature} />
                    <Route exact path="/cart" component={CartFeature} />
                    <Route exact path="/checkout" component={CheckoutFeature} />

                    <Route>
                        <Redirect to="/404">
                            <NotFound />
                        </Redirect>
                    </Route>
                </Switch>
            </Layout.Content>

            <AppFooter />
        </Layout>
    );
}

export default CustomerFeature;
