/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

class ValidationService {
  constructor() {
    this._error = '';
    this._errors = {};
  }

  getError() {
    return this._error;
  }

  getErrorList() {
    return this._errors;
  }

  wholeValid(data) {
    this._errors = {};
    let status = true;
    for (const i in data) {
      if (!this.isValid(data[i])) {
        this._errors[i] = this._error;
        status = false;
      }
    }
    return status;
  }

  isValid(data) {
    this._error = '';
    if ((data.required === undefined || data.required === false) && data.value === '') {
      return true;
    }
    if (!this.checkProperty(data)) {
      return false;
    }
    switch (data.type) {
      case 'email':
        return this.checkEmail(data);
      case 'password':
        return this.checkPassword(data);
      case 'checkbox':
        return this.checkCheckbox(data);
      case 'number':
      case 'integer':
        return this.checkNumber(data);
      case 'boolean':
        return this.checkBoolean(data);
      case 'url':
        return this.checkUrl(data);
      case 'mac':
        return this.checkMac(data);
      case 'ip':
        return this.checkIP(data);
      case 'domain':
        return this.checkDomain(data);
      case 'phone':
        return this.checkPhone(data);
      case 'text':
      case 'string':
      case 'date':
        return this.checkDefault();
      default:
        return this.checkDefault();
    }
  }

  isValidRef(data) {
    if (this.isValid(data) === false) {
      data.error = this._error;
    } else {
      data.error = false;
    }
    return data;
  }

  wholeValidRef(data) {
    for (const i in data) {
      if (this.isValid(data[i]) === false) {
        data[i].error = this._error;
      } else {
        data[i].error = false;
      }
    }
    return data;
  }

  clearValidRef(data) {
    // eslint-disable-next-line guard-for-in
    for (const i in data) {
      data[i].error = false;
    }
    return data;
  }

  /**/
  checkDefault() {
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  checkCheckbox(data) {
    return true;
  }

  checkBoolean(data) {
    if (typeof data.value === 'boolean') {
      return true;
    }
    this._error = 'error_isboolean';
    return false;
  }

  checkNumber(data) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(parseFloat(data.value)) && isFinite(data.value)) {
      return true;
    }
    this._error = 'error_isnumber';
    return false;
  }

  checkPassword(data) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{1,}$/;
    if (re.test(data.value)) {
      return true;
    }
    this._error = 'error_weakpassword';
    return false;
  }

  checkEmail(data) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(data.value).toLowerCase())) {
      return true;
    }
    this._error = 'error_invalidemail';
    return false;
  }

  checkUrl(data) {
    // eslint-disable-next-line
    var re = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    // const re = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
    if (re.test(String(data.value).toLowerCase())) {
      return true;
    }
    this._error = 'error_invalidurl';
    return false;
  }

  checkMac(data) {
    const re = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
    if (re.test(data.value)) {
      return true;
    }
    this._error = 'error_invalidmac';
    return false;
  }

  checkDomain(data) {
    // eslint-disable-next-line max-len
    const re = /^(([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]|[a-zA-Z0-9])\.)*[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/gm;
    if (re.test(data.value)) {
      return true;
    }
    this._error = 'error_invaliddomain';
    return false;
  }

  checkIP(data) {
    // eslint-disable-next-line max-len
    const re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (re.test(data.value)) {
      return true;
    }
    this._error = 'error_invalidip';
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  checkPhone(data) {
    return true;
  }

  /* property methods */
  checkProperty(data) {
    if (this.checkRequired(data)
      && this.checkMinLength(data)
      && this.checkMaxLength(data)
      && this.checkMax(data)
      && this.checkMin(data)) {
      return true;
    }
    return false;
  }

  checkMax(data) {
    if ((data.type === 'number' || data.type === 'integer') && typeof data.max !== 'undefined' && this.checkNumber(data)) {
      if (data.value <= data.max) {
        return true;
      }
      this._error = 'error_maxnumber';
      return false;
    }
    return true;
  }

  checkMin(data) {
    if ((data.type === 'number' || data.type === 'integer') && typeof data.min !== 'undefined' && this.checkNumber(data)) {
      if (data.value >= data.min) {
        return true;
      }
      this._error = 'error_minnumber';
      return false;
    }
    return true;
  }

  checkMaxLength(data) {
    if (typeof data.maxLength !== 'undefined') {
      if (data.value.length <= data.maxLength) {
        return true;
      }
      this._error = 'error_maxlength';
      return false;
    }
    return true;
  }

  checkMinLength(data) {
    if (data.minLength !== undefined) {
      if (data.value.length >= data.minLength) {
        return true;
      }
      this._error = 'error_minlength';
      return false;
    }
    return true;
  }

  checkRequired(data) {
    if (data.required !== undefined && data.required === true) {
      if (typeof data.value !== 'undefined' && data.value !== null) {
        if (typeof data.value === 'string' && data.value.trim() === '') {
          this._error = 'error_required';
          return false;
        }
        if (typeof data.value.length !== 'undefined' && data.value.length > 0) {
          return true;
        }
        if (typeof data.value !== 'undefined' && typeof data.value.length === 'undefined') {
          return true;
        }
      }
      this._error = 'error_required';
      return false;
    }
    return true;
  }
}

export default new ValidationService();
