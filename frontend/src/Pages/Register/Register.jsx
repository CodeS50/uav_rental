import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AlertService from '../../Services/AlertService';
import LoadingService from '../../Services/LoadingService';
import APIV3Service from '../../Services/APIV3Service';
import ValidationService from '../../Services/ValidationService';
import FormInput from '../../Components/FormInput/FormInput';

const Reister = () => {
  const history = useHistory();
  const [data, setData] = useState({
    username: {
      type: 'text',
      value: '',
      required: true,
      error: false,
    },
    email: {
      type: 'email',
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
    },
    repassword: {
      type: 'text',
      value: '',
      required: true,
      error: false,
    },
    first_name: {
      type: 'text',
      value: '',
      required: true,
      error: false,
    },
    last_name: {
      type: 'text',
      value: '',
      required: true,
      error: false,
    },
  });

  const handleFormInput = (key, value) => {
    data[key].value = value;
    setData({ ...data });
  };

  const keyValueData = (objData) => {
    const kvdata = {};
    Object.keys(objData).forEach((key) => {
      kvdata[key] = objData[key].value;
    });
    return kvdata;
  };

  const handleSubmit = () => {
    if (ValidationService.wholeValid(data)) {
      (async () => {
        const loading = new LoadingService().start();
        try {
          await APIV3Service.post(
            '/register',
            keyValueData(data)
          );
          AlertService.Add({
            message: 'Kayıt başarılı',
            level: 'success',
            autoDismiss: true,
          });
          history.push('/login');
          loading.end();
        } catch (error) {
          AlertService.Add({
            message: error.response.body.message,
            level: 'danger',
            autoDismiss: true,
          });
          Object.keys(data).forEach((e) => {
            if(typeof error.response.body.fields[e] !== 'undefined') {
              if(typeof error.response.body.fields[e][0] !== 'undefined'){
                // eslint-disable-next-line prefer-destructuring
                data[e].error = error.response.body.fields[e][0];
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
        <h1 className="h3 mb-3 fw-normal">Kayıt Olunuz</h1>
        <FormInput
            type="text"
            keyword="username"
            labelText="Kullanıcı Adı"
            placeHolder=""
            data={data.username}
            onChange={(keyword, value) => handleFormInput(keyword, value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        <FormInput
          type="email"
          keyword="email"
          labelText="email"
          placeHolder="name@example.com"
          data={data.email}
          onChange={(keyword, value) => handleFormInput(keyword, value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <FormInput
          type="password"
          keyword="password"
          labelText="Şifre"
          placeHolder="***"
          data={data.password}
          onChange={(keyword, value) => handleFormInput(keyword, value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <FormInput
          type="password"
          keyword="repassword"
          labelText="Şifre tekrar"
          placeHolder="***"
          data={data.repassword}
          onChange={(keyword, value) => handleFormInput(keyword, value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <FormInput
          type="text"
          keyword="first_name"
          labelText="Ad"
          placeHolder="adınız..."
          data={data.first_name}
          onChange={(keyword, value) => handleFormInput(keyword, value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <FormInput
          type="text"
          keyword="last_name"
          labelText="Soyad"
          placeHolder="soyadınız..."
          data={data.last_name}
          onChange={(keyword, value) => handleFormInput(keyword, value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <button className="btn btn-primary w-100 py-2" type="button" onClick={() => handleSubmit()}>
          Kayıt Ol
        </button>
        <div className="d-flex justify-content-end text-end">
          <Link to="/login">Giriş Yap</Link>
        </div>
    </main>
  );
};
export default Reister;
