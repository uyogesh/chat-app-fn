import React, { useEffect, useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { USER_SIGNUP } from '../../apollo/mutations'
import { SUBSCRIBE_NEW_MESSAGE } from '../../apollo/subscriptions'

import './style.css'

const Login = props => {
  const [formData, setFormData] = useState({ username: '', password: '', name: "" })
  const [loginError, setError] = useState(false)
  const [SignupUser, { data, loading, error }] = useMutation(USER_SIGNUP)
  

  const handleSubmit = () => {
    setError(false)
    SignupUser({
      variables: {
        input: { email: formData.username, password: formData.password, name: formData.name }
      }
    })
    if (!error) {
      localStorage.setItem('user-credentials', JSON.stringify(data?.loginUser))
      props.history.push('login', { user: data?.loginUser })
    } else {
      setError(true)
    }
  }

  return (
    <div className='login-container'>
      <div className='inner-container'>
        <form onSubmit={handleSubmit}>
          <h4>Signup for a account</h4>
          <label className='login-label' htmlFor='username'>
            Name
          </label>
          <input
            name='name'
            required
            onChange={e => {
              e.preventDefault()
              setFormData({ ...formData, name: e.target.value })
            }}
          />
          <label className='login-label' htmlFor='username'>
            Email
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
            <span>* password must contain 1 number</span>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
