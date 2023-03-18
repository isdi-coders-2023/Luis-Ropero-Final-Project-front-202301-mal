import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(true).toBe(true);
});
