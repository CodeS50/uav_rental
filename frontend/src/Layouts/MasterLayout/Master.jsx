import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink
} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

const Home = lazy(() => import('../../Pages/Home/Home'));
const Logout = lazy(() => import('../../Pages/Account/Logout'));
const Products = lazy(() => import('../../Pages/Products/Products'));

const Master = () => {
  const menu = [
    {
      url: '/home',
      text: 'Ana sayfa',
    },
    {
      url: '/products',
      text: 'Ürünler',
    },
  ];

  return (
    <Suspense fallback={<Loading status={false} />}>
      <Router>
        <div className="master-layout">
          <header className="bg-white">
            <div className="container">
              <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start navbar navbar-expand-lg">
                <ul className="navbar-nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  {menu.map((item) => (
                    <li key={item.url} className="nav-item">
                      <NavLink to={item.url} className="nav-link px-2">
                        {item.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main>
            <div className="container">
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/logout" component={Logout} />
                <Route path="/products" component={Products} />
                
                <Route path="/login" render={() => <Redirect to="/home" />} />
                <Route exact path="*" render={() => <Redirect to="/home" />} />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    </Suspense>
  );
};

export default Master;
