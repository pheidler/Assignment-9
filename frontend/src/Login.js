import React from 'react';
import {useHistory} from 'react-router-dom';

/**
 * A full fledged web app
 *
 * @return {object} JSX
 */
function Login() {
  const [username, setUsername] = React.useState({email: '', password: ''});
  const history = useHistory();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = username;
    u[name] = value;
    setUsername(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/authenticate', {
      method: 'POST',
      body: JSON.stringify(username),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          localStorage.setItem('user', JSON.stringify(json));
          history.push('/main');
        })
        .catch((err) => {
          alert('Error logging in, please try again');
        });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 id='welcome'>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleInputChange}
        required
      />
      <br></br>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
        required
      />
      <br></br>
      <input type="submit" value="Sign In"/>
    </form>
  );
}

export default Login;
