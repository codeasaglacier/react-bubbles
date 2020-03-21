import axios from 'axios'

export const axiosAuth = () => {
  const token = localStorage.getItem( 'token' )
  console.log( 'Token:', token)
  
  return axios.create( { 
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  } )
}
