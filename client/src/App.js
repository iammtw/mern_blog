import {BrowserRouter as Router, Route, Switch} from "react-router-dom" 
import './main.scss'
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from './components/Dashboard';
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import NotFound from "./components/NotFound";
import Create from "./components/Create";
import Edit from "./components/Edit";


function App() {
  return (
    <Provider store={store}>
        <Router>
          <Navbar />
            <Switch>
              <Route path='/' exact component={Home} />
              <RouteLinks path='/register' exact component={Register} />
              <RouteLinks path='/login' exact component={Login} />
              <PrivateRoute path='/dashboard/:page?' exact component={Dashboard} />
              <PrivateRoute path='/create' exact component={Create} />
              <PrivateRoute path='/edit/:id' exact component={Edit} />
              <Route component={NotFound} />
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
