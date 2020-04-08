import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './pages/app';
import registerServiceWorker from './registerServiceWorker';
import { configure } from './store';
import { Provider } from 'react-redux';

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
