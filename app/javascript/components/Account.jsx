import React, { useState } from 'react';
import { headers } from '../utils';

function Account() {
  const [values, setValues] = useState({ password: '', password_confirmation: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/update_password', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ user: values }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((response) => {
          /* eslint-disable-next-line no-alert */
          alert(response.success);
        });
      } else {
        res.json().then((response) => {
          /* eslint-disable-next-line no-alert */
          alert(response.errors);
        });
      }
      setValues({ password: '', password_confirmation: '' });
    });
  };

  return (
    <>
      <h2>Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password_confirmation">Password confirmation</label>
        <br />
        <input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          value={values.password_confirmation}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default Account;
