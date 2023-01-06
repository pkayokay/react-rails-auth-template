import React, { useContext, useState } from 'react';
import { headers } from '../../utils';
import { AuthUpdateContext } from '../../auth/AuthContext';
import RegistrationLinks from './RegistrationLinks';

function SignInForm() {
  const setUser = useContext(AuthUpdateContext);
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/sign_in', {
      method: 'POST',
      headers,
      body: JSON.stringify({ user: values }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        res.json().then((user) => {
          /* eslint-disable-next-line no-alert */
          alert(user.errors);
        });
      }
    });
  };

  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="email"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Sign in</button>
      </form>
      <RegistrationLinks />
    </>
  );
}

export default SignInForm;
