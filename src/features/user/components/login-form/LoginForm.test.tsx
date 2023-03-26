import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../app/store';
import { server } from '../../../../mocks/server';
import { renderWithProviders } from '../../../../mocks/test-util';
import LoginForm from './LoginForm';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Given a login form component', () => {
  test('When the component loads, then it should be a welcome message', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    expect(
      await screen.findByText('Welcome to Pre-travel'),
    ).toBeInTheDocument();
    expect(await screen.findByText('Vaccination')).toBeInTheDocument();
  });

  test('When a user tries to login with a valid email and password, then he should receive his access token', async () => {
    renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'email@test.com',
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Successfully logged in!')).toBeInTheDocument();
    });
    expect(sessionStorage.getItem('accessToken')).toBeDefined();
  });

  test('When an user tries to log with incorrect email or password, then it should respond an error', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'email2@test.com',
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Error while logging in')).toBeInTheDocument();
    });
  });
});
