import React from 'react';
import ReactDOM from 'react-dom';
import StarWarsProvider from './context/StarWarsProvider';
import App from './App';

ReactDOM.render(
  <StarWarsProvider>
    <App />
  </StarWarsProvider>,
  document.getElementById('root'),
);
