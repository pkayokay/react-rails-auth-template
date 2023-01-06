import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignUpForm from './components/users/SignUpForm';
import SignInForm from './components/users/SignInForm';
import AuthRoute from './auth/AuthRoute';
import AuthProvider from './auth/AuthContext';
import Navigation from './Navigation';
import Account from './components/Account';
import ForgotPasswordForm from './components/users/ForgotPasswordForm';
import ResetPasswordForm from './components/users/ResetPasswordForm';
import ConfirmEmailForm from './components/users/ConfirmEmailForm';

const router = createBrowserRouter([
  {
    path: 'app',
    element: (
      <>
        <Navigation />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '',
        element: (
          <AuthRoute>
            <h2>Dashboard</h2>
          </AuthRoute>
        ),
      },
      {
        path: 'account',
        element: (
          <AuthRoute>
            <Account />
          </AuthRoute>
        ),
      },
      {
        path: 'sign_in',
        element: (
          <AuthRoute isPrivate={false}>
            <SignInForm />
          </AuthRoute>
        ),
      },
      {
        path: 'sign_up',
        element: (
          <AuthRoute isPrivate={false}>
            <SignUpForm />
          </AuthRoute>
        ),
      },
      {
        path: 'forgot_password',
        element: (
          <AuthRoute isPrivate={false}>
            <ForgotPasswordForm />
          </AuthRoute>
        ),
      },
      {
        path: 'reset_password/:token',
        element: (
          <AuthRoute isPrivate={false}>
            <ResetPasswordForm />
          </AuthRoute>
        ),
      },
      {
        path: 'confirm_email',
        element: <ConfirmEmailForm />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>,
  );
}
