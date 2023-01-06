import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { headers } from '../../utils';
import RegistrationLinks from './RegistrationLinks';

function ForgotPassword() {
  const [values, setValues] = useState({ email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ email: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/send_password_reset', {
      method: 'POST',
      headers,
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((response) => {
          /* eslint-disable-next-line no-alert */
          alert(response.success);
          navigate('/app/sign_in');
        });
      }
    });
  };

  return (
    <>
      <h2>Forgot password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Send password reset</button>
      </form>
      <RegistrationLinks />
    </>
  );
}

export default ForgotPassword;
