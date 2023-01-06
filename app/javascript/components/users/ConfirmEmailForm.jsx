import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { headers } from '../../utils';
import { AuthUserContext } from '../../auth/AuthContext';
import RegistrationLinks from './RegistrationLinks';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function ConfirmEmailForm() {
  const query = useQuery();
  const token = query.get('token');
  const user = useContext(AuthUserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '' });

  const handleChange = (e) => {
    setValues({ email: e.target.value });
  };

  if (user?.isConfirmed) {
    return <Navigate to="/app" replace />;
  }

  useEffect(() => {
    if (token) {
      fetch('/confirm_email', {
        method: 'POST',
        headers,
        body: JSON.stringify({ token }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((response) => {
            navigate('/app');
            /* eslint-disable-next-line no-alert */
            alert(response.success);
          });
        } else {
          res.json().then((response) => {
            navigate('/app/confirm_email');
            /* eslint-disable-next-line no-alert */
            alert(response.errors);
          });
        }
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/send_confirmation_token', {
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
      <h2>Confirm Email</h2>
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
        <button type="submit">Send email confirmation</button>
      </form>
      <RegistrationLinks />
    </>
  );
}

export default ConfirmEmailForm;
