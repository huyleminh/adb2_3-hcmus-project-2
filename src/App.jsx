import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminFeature from "./features/Admin";
import LoginFeature from "./features/Auth/Login";
import RegisterFeature from "./features/Auth/Register";
import CustomerFeature from "./features/Customer/index.";
import EmployeeFeature from "./features/Employee";
import Forbidden from "./features/Errors/403";
import NotFound from "./features/Errors/404";
import InternalError from "./features/Errors/500";
import ManagerFeature from "./features/Manager";

function App() {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/login" component={LoginFeature} />
                <Route exact path="/register" component={RegisterFeature} />

                <Route exact path="/403" component={Forbidden} />
                <Route exact path="/404" component={NotFound} />
                <Route exact path="/500" component={InternalError} />

                <PrivateRoute path={`/admin`} component={AdminFeature} />
                <PrivateRoute path={`/manager`} component={ManagerFeature} />
                <PrivateRoute path={`/employee`} component={EmployeeFeature} />

                <Route path="/" component={CustomerFeature} />
                <Route>
                    <Redirect to="/404">
                        <NotFound />
                    </Redirect>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
