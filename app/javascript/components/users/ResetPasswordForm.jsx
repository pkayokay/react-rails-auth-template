import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { headers } from '../../utils';

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({ password: '', password_confirmation: '' });
  const [disableInputs, setDisableInputs] = useState(false);

  useEffect(() => {
    fetch('/verify_password_reset_token', {
      method: 'POST',
      headers,
      body: JSON.stringify({ token }),
    }).then((res) => {
      if (!res.ok) {
        res.json().then((response) => {
          /* eslint-disable-next-line no-alert */
          alert(response.errors);
          setDisableInputs(true);
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/reset_password', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ user: { ...values }, token }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((response) => {
          /* eslint-disable-next-line no-alert */
          alert(response.success);
          navigate('/app/sign_in');
        });
      } else {
        res.json().then((response) => {
          /* eslint-disable-next-line no-alert */
          alert(response.errors);
        });
      }
    });
  };

  return (
    <>
      <h2>Reset password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          name="password"
          disabled={disableInputs}
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
          disabled={disableInputs}
          value={values.password_confirmation}
          onChange={handleChange}
          required
        />
        <br />
        <button disabled={disableInputs} type="submit">Reset password</button>
      </form>
      <br />
      <Link to="/app/forgot_password">Forgot your password?</Link>
    </>
  );
}

export default ResetPasswordForm;
