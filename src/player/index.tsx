import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import 'typeface-roboto';

function renderApp() {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
}

renderApp();

const hot = (module as any).hot;

if (hot) {
  hot.accept('./app', () => {
    renderApp();
  });
}
