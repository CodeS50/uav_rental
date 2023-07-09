import React, { useEffect, lazy, Suspense } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
import Loading from './Components/Loading/Loading';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import './Assets/css/style.css';

const Master = lazy(() => import('./Layouts/MasterLayout/Master'));
const Auth = lazy(() => import('./Layouts/AuthLayout/Auth'));

const AppLayout = ({ isLogged }) => {
  if (isLogged) {
    return <Master />;
  }
  return <Auth />;
};
AppLayout.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const App = inject('AuthStore')(
  observer(({ AuthStore }) => {
    useEffect(() => {
      // console.log('view mountedsss');
      // console.log(AuthStore.getToken());
    }, []);

    let loadingstatus = true;
    if (
      Object.keys(AuthStore.loading).filter((x) => AuthStore.loading[x])
        .length > 0
    ) {
      loadingstatus = false;
    }

    return (
      <div className="App">
        <Suspense fallback={<Loading status={false} />}>
          <AppLayout isLogged={AuthStore.isLogged} />
        </Suspense>
        <Loading status={loadingstatus} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="ct-version-code">
          VER:{' '}
          {
            // eslint-disable-next-line no-process-env
            process.env.VERSION
          }
        </div>
      </div>
    );
  })
);

export default App;
