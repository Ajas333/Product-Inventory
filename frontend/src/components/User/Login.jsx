import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <div>
        <h1>Login</h1>
       <form action="">
        <div>
                <input type="text" name="username" />
                <label htmlFor="">Username</label>
            </div>
            <div>
                <input type="password" name="password"  />
                <label htmlFor="">Password</label>
            </div>
            <button type='submit'>Login</button>
            <div>
                <span>New Here? <Link to={'Register'}>Create an Account</Link></span>
            </div>
       </form>
      </div>
    </div>
  )
}

export default Login
