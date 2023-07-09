import React from 'react';
import PropTypes from 'prop-types';

const FormAlert = ({ error }) => (
  <small hidden={error === false} className="text-danger">
    {`${error !== false ? error : ''}`}
  </small>
);

FormAlert.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any.isRequired,
};

export default FormAlert;
