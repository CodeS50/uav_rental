/* eslint-disable global-require */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './loading.css';

const Loading = ({ status }) => {
  useEffect(() => {
    // console.log('view mountedsss');
    // console.log(AuthStore.getToken());
  }, []);

  return (
    <div className={`wr-loading ${!status ? 'show' : 'hide'}`}>
      <div className="wr-loading-content">
        Yükleniyor...
      </div>
    </div>
  );
};
Loading.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default Loading;
