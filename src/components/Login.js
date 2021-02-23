/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div id="login-container">
      <h2>Login</h2>
      <div>
        Try logging in as the below users
        <ul>
          <li>
            <strong>Username:</strong> richen <br /> <strong>Password:</strong>{' '}
            testpassword
          </li>
          <li>
            <strong>Username:</strong> kyle <br /> <strong>Password:</strong>{' '}
            testpassword
          </li>
        </ul>
      </div>

      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          Username
          <input
            placeholder="Type your username"
            id="usernameInput"
            className="login-input"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            placeholder="Type your password"
            id="passwordInput"
            className="login-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="primary" type="submit">
          LOGIN
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
