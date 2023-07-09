import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import './auth.css';

const Login = lazy(() => import('../../Pages/Login/Login'));
const Register = lazy(() => import('../../Pages/Register/Register'));

const Auth = () => (
  <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <Suspense fallback={<Loading status={false} />}>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="*" render={() => <Redirect to="/login" />} />
            </Switch>
          </Router>
        </Suspense>
      </div>
);
export default Auth;
