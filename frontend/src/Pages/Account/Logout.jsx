import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const Logout = inject('AuthStore')(
  observer(({ AuthStore }) => {
    const history = useHistory();

    useEffect(() => {
      AuthStore.clearLoginProps();
      history.push('/login');
    });

    return null;
  }),
);

Logout.propTypes = {};

export default Logout;