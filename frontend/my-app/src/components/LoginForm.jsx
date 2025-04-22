import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithKeycloak, auth, setLoginMethod, initKeycloak } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };
  //const authContext = useAuth();
  const handleKeycloakLogin = () => {
    console.log(auth)

    if (auth.initialized && auth.loginMethod === 'keycloak') {
      loginWithKeycloak();
    } else {
      setLoginMethod('keycloak');
      //initKeycloak();
      loginWithKeycloak();
    }

  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <hr />
      <div>
        <h3>Login with Keycloak</h3>
        <button onClick={handleKeycloakLogin}>Log In with Keycloak</button>
      </div>
    </div>
  );
}

export default LoginForm;