import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import AlertService from '../../Services/AlertService';
import LoadingService from '../../Services/LoadingService';
import APIV3Service from '../../Services/APIV3Service';
import ValidationService from '../../Services/ValidationService';
import FormInput from '../../Components/FormInput/FormInput';

const Login = inject('AuthStore')(
  observer(({ AuthStore }) => {
    const history = useHistory();
    const [data, setData] = useState({
      username: {
        type: 'text',
        value: '',
        required: true,
        minLength: 3,
        maxLength: 255,
        error: false,
      },
      password: {
        type: 'text',
        value: '',
        required: true,
        error: false,
        show: false,
      },
    });

    const handleChange = (event) => {
      data[event.target.name].value =
        event.target.type === 'checkbox' || event.target.type === 'radio'
          ? event.target.checked
          : event.target.value;
      setData({ ...data });
    };

    const handleSubmit = () => {
      if (ValidationService.wholeValid(data)) {
        (async () => {
          const loading = new LoadingService().start();
          try {
            const response = await APIV3Service.post('/token', {
              username: data.username.value,
              password: data.password.value,
            });
            AuthStore.setLoginProps(
              response.body.access
            );
            history.push('/home');
            loading.end();
          } catch (error) {
            AlertService.Add({
              message: error.response.body.detail,
              level: 'danger',
              autoDismiss: true,
            });
            Object.keys(data).forEach((e) => {
              if(typeof error.response.body[e] !== 'undefined') {
                if(typeof error.response.body[e][0] !== 'undefined'){
                  // eslint-disable-next-line prefer-destructuring
                  data[e].error = error.response.body[e][0];
                }
              }
            });
            setData({ ...data });
            loading.end();
          }
        })();
      } else {
        const nData = ValidationService.wholeValidRef(data);
        setData({ ...nData });
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    return (
      <main className="form-signin w-100 m-auto">
          <h1 className="h3 mb-3 fw-normal">Giriş Yapınız</h1>
          <FormInput
            type="text"
            keyword="username"
            labelText="Kullanıcı Adı"
            placeHolder=""
            data={data.username}
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <FormInput
            type="password"
            keyword="password"
            labelText="şifre"
            placeHolder="***"
            data={data.password}
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button className="btn btn-primary w-100 py-2" type="button" onClick={() => handleSubmit()}>
            Giriş Yap
          </button>
          <div className="d-flex justify-content-end text-end">
            <Link to="/register">Kayıt Ol</Link>
          </div>
      </main>
    );
  })
);
export default Login;
