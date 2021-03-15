import React, { useEffect, useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { USER_LOGIN } from '../../apollo/mutations'
import { SUBSCRIBE_NEW_MESSAGE } from '../../apollo/subscriptions'

import './style.css'

const Login = props => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loginError, setError] = useState(false)
  const [loginUser, { data, loading, error }] = useMutation(USER_LOGIN)
  

  const handleSubmit = () => {
    setError(false)
    loginUser({
      variables: {
        input: { email: formData.username, password: formData.password }
      }
    })
    if (!error) {
      localStorage.setItem('user-credentials', JSON.stringify(data?.loginUser))
      props.history.push('dashboard', { user: formData.username })
    } else {
      setError(true)
    }
  }

  return (
    <div className='login-container'>
      <div className='inner-container'>
        <form onSubmit={handleSubmit}>
          <h4>Login to your account</h4>
          <label className='login-label' htmlFor='username'>
            Username/email
          </label>
          <input
            name='username'
            required
            onChange={e => {
              e.preventDefault()
              setFormData({ ...formData, username: e.target.value })
            }}
          />
          <label className='login-label' htmlFor='password'>
            Password
          </label>
          <input
            name='password'
            type='password'
            required
            onChange={e => {
              e.preventDefault()
              setFormData({ ...formData, password: e.target.value })
            }}
          />
          <button
            className='login-btn'
            type='button'
            title='Login'
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
