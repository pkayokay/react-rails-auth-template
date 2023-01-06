import React from 'react';
import { Link } from 'react-router-dom';

function RegistrationLinks() {
  const signUpLink = <Link to="/app/sign_up">Sign up</Link>;
  const signInLink = <Link to="/app/sign_in">Sign in</Link>;
  const confirmEmailLink = <Link to="/app/confirm_email">Confirmation Instructions</Link>;
  return (
    <>
      {signUpLink}
      <br />
      {signInLink}
      <br />
      {confirmEmailLink}
      <br />
      <a href="/">Home</a>
    </>
  );
}

export default RegistrationLinks;
