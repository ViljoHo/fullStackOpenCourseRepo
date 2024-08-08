import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ logInFunc }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (event) => {
    event.preventDefault()
    event.preventDefault()

    logInFunc({ username, password })

    setUsername('')
    setPassword('')

  }



  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            data-testid='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            data-testid='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.protoTypes = {
  logInFunc: PropTypes.func.isRequired
}

export default LoginForm
