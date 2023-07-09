/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormAlert from '../FormAlert/FormAlert';

const FormInput = ({
  type, keyword, data, onChange = null, onKeyPress = null, labelText = '', placeHolder = '', options = [], row = false, col = 0, id = null,
}) => {
  const [passwdShow, setPasswdShow] = useState(false);
  const customType = [
    'radio',
    'checkbox',
    'select',
    'password',
    'phone',
    'image',
    'file',
    'textarea',
    'date',
    'country',
  ];

  const handleChange = (event, isEvent = true) => {
    if (onChange !== null) {
      if (onChange.length === 1) {
        if (isEvent) {
          onChange(event);
        } else {
          const nEvent = {
            target: {
              value: event,
              name: keyword,
            },
          };
          onChange(nEvent);
        }
      }
      if (onChange.length === 2) {
        if (isEvent) {
          onChange(keyword, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        } else {
          onChange(keyword, event);
        }
      }
    }
  };

  let htmlId = `input-${keyword}`;

  if (id !== null) {
    htmlId = id;
  }

  return (
    <div className={`mb-3${row ? ' row' : ''}`}>
      {(labelText !== '' && type !== 'checkbox') && (
        <label htmlFor={htmlId} className={`${row ? `col-sm-${12 - col} col-form-label` : 'form-label'}`}>
          {labelText}
          {(typeof data.required !== 'undefined' && data.required) && '*'}
        </label>
      )}
      <div className={`${row ? `col-sm-${col}` : ''}`}>
        {
          (type === 'textarea') && (
            <textarea
              className="form-control"
              id={htmlId}
              placeholder={placeHolder}
              name={keyword}
              onChange={(e) => handleChange(e)}
              value={data.value}
            />
          )
        }

        {
          type === 'checkbox' && (
            <div className="form-check">
              <input
                className="form-check-input"
                id={htmlId}
                type="checkbox"
                name={keyword}
                value=""
                onChange={(val) => handleChange(val)}
                checked={data.value}
              />
              <label className="form-check-label" htmlFor={htmlId}>
                {labelText}
              </label>
            </div>
          )
        }

        {
          type === 'radio' && (
            <>
              {
                options.map((option) => (
                  <div className="form-check" key={option.value}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={keyword}
                      value={option.value}
                      id={`${htmlId}${option.value}`}
                      onChange={(val) => handleChange(val)}
                      checked={String(data.value) === String(option.value)}
                    />
                    <label className="form-check-label" htmlFor={`${htmlId}${option.value}`}>
                      {option.name}
                    </label>
                  </div>
                ))
              }
            </>
          )
        }
        {
          type === 'select' && (
            <select
              className="form-select"
              id={htmlId}
              name={keyword}
              value={data.value}
              onChange={(val) => handleChange(val)}
            >
              {placeHolder !== '' && (
                <option value="">{placeHolder}</option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>{option.name}</option>
              ))}
            </select>
          )
        }

        {
          type === 'password' && (
            <div className="input-group">
              <input
                type={(!passwdShow) ? 'password' : 'text'}
                className="form-control"
                id={htmlId}
                placeholder={placeHolder}
                name={keyword}
                value={data.value}
                onChange={(val) => handleChange(val)}
                onKeyPress={(e) => {
                  if (onKeyPress !== null) {
                    onKeyPress(e);
                  }
                }}
              />
              <div className="input-group-addon">
                <FontAwesomeIcon
                  icon={(!passwdShow) ? faEye : faEyeSlash}
                  onClick={() => setPasswdShow(!passwdShow)}
                />
              </div>
            </div>
          )
        }

        {
          type === 'date' && (
            <DatePicker
              className="form-control"
              id={htmlId}
              placeholder={placeHolder}
              name={keyword}
              selected={(data.value === '' || data.value === null) ? null : new Date(data.value)}
              onChange={(d) => ((d === null) ? handleChange('', false) : handleChange(`${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`, false))}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="yyyy/MM/dd HH:mm"
            />
          )
        }

        {
          (customType.indexOf(type) === -1) && (
            <input
              type={type}
              className="form-control"
              id={htmlId}
              placeholder={placeHolder}
              name={keyword}
              value={data.value}
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => {
                if (onKeyPress !== null) {
                  onKeyPress(e);
                }
              }}
            />
          )
        }

        <FormAlert error={data.error} />

      </div>
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeHolder: PropTypes.string,
  data: PropTypes.any.isRequired,
  onChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(null),
  ]),
  onKeyPress: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(null),
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      name: PropTypes.any.isRequired,
    }).isRequired,
  ),
  row: PropTypes.bool,
  col: PropTypes.number,
  id: PropTypes.string,
};

export default FormInput;
