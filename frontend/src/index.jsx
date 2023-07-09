import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import App from './App';
import AuthStore from './Stores/AuthStore';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider AuthStore={AuthStore}>
    <App />
  </Provider>
);
