import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/App.css';
import logo from '../src/assets/logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded valid credentials
    const validUsername = 'lgeforecast';
    const validPassword = 'QCA@2024';

    // Check if entered credentials match the valid ones
    if (username === validUsername && password === validPassword) {
      // Store the username to indicate a successful login
      sessionStorage.setItem('username', username);

      // Navigate to the dashboard
      navigate('/dashboard');
    } else {
      // Show error if credentials do not match
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <section className="min-vh-100 loginsection">
        <div className="container-fluid">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-8 loginbg"></div>
            <div className="col-md-4">
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <img src={logo} alt="Logo" className="img-fluid" />
                </div>
              </div>
              <div className="card p-5 shadow-sm mt-5">
                <form onSubmit={handleLogin}>
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    placeholder="Enter Your Username..."
                    required
                  />
                  <label htmlFor="password" className="form-label mt-4">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    required
                  />
                  {error && <p className="text-danger mt-3 text-center border p-3 rounded mt-4 bg-light">{error}</p>}
                  <div className="text-center">
                    <button type="submit" className="btn btn-danger mt-4 px-5 fs-4 pendingbtn whitetext border border-2 border-danger">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

