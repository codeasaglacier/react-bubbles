import React, { useState } from 'react'
import { axiosAuth } from './axiosAuth'



const Login = ( props ) => {
  console.log( 'props:', props )
  const [ cred, setCred ] = useState( {} )

  const login = e => {
    e.preventDefault()
      axiosAuth()
      .post( `http://localhost:5000/api/login`, cred )
      .then( res => {
        localStorage.setItem( 'token', res.data.payload )
        props.history.push( '/protected' )
      } )
      .catch( err => console.log( 'Error:', err ))
  }

  const handleBusiness = e => {
    setCred( {
      ...cred,
      [ e.target.name ]: e.target.value,
    } )
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit = { login }>
        <input
          type = 'text'
          name = 'username'
          value = { cred.username }
          onChange = { handleBusiness }
        />
        <input
          type = 'password'
          name = 'password'
          value = { cred.password }
          onChange = { handleBusiness }
        />
        <button>Log In</button>
      </form>
    </div>
  )
}



export default Login