import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthUserContext = React.createContext();
export const AuthUpdateContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((userResponse) => {
          if (userResponse.email) {
            setUser(userResponse);
          } else {
            setUser(null);
          }
        });
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthUserContext.Provider value={user}>
      <AuthUpdateContext.Provider value={setUser}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthUserContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
