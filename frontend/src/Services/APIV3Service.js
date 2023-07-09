import superagent from 'superagent';
import AuthStore from '../Stores/AuthStore';
import AlertService from './AlertService';

const API_ROOT = process.env.API_URL;

const handleErrors = (res) => {
  if (res !== null) {
    if (res.response && res.response.status === 401) {
      AuthStore.clearLoginProps();
    } else if (res.response) {
      AlertService.Add({
        type: 'console',
        message: res.response.body.detail,
        level: 'error',
        autoDismiss: true,
      });
    }
    if (typeof res.response !== 'undefined') {
      return res.response.body;
    }
    return {
      error: {
        code: 'error_response',
        message: 'error response data',
      },
    };
  }
  return null;
};

const tokenPlugin = (req) => {
  // req.set('Access-Control-Allow-Origin', '*');
  if (AuthStore.isLoggedIn()) {
    req.set('Authorization', `Bearer ${AuthStore.getToken()}`);
  }
};

async function post(url, body) {
  const x = await superagent.post(`${API_ROOT}${url}`)
    .send(body)
    .use(tokenPlugin)
    .on('error', handleErrors);
  return x;
}

async function put(url, body) {
  const x = await superagent.put(`${API_ROOT}${url}`)
    .send(body)
    .use(tokenPlugin)
    .on('error', handleErrors);
  return x;
}

async function del(url) {
  const x = await superagent.del(`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .on('error', handleErrors);
  return x;
}

async function get(url) {
  const x = await superagent.get(`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .on('error', handleErrors);
  return x;
}

async function getByParam(url, params) {
  const x = await superagent.get(`${API_ROOT}${url}`, params)
    .use(tokenPlugin)
    .on('error', handleErrors);
  return x;
}

export default {
  post,
  put,
  del,
  get,
  getByParam,
};
