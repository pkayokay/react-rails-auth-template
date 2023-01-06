import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { headers } from './utils';
import { AuthUserContext, AuthUpdateContext } from './auth/AuthContext';

const CONFIRM_EMAIL_PATH = '/app/confirm_email';

function Navigation() {
  const user = useContext(AuthUserContext);
  const setUser = useContext(AuthUpdateContext);
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers,
    }).then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  };
  if (!user || pathname.includes(CONFIRM_EMAIL_PATH)) {
    return null;
  }
  return (
    <>
      <a href="/">Home</a>
      <br />
      <br />
      <button type="submit" onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <Link to="/app">Dashboard</Link>
      <br />
      <Link to="/app/account">Account</Link>
      <br />
      {!user.isConfirmed && (
        <p>You need to confirm your email address.</p>
      )}
      <br />
    </>
  );
}

export default Navigation;
