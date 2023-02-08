import React from 'react'

import { useState } from 'react'
import './index.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [errorMessage, setErrMessage] = useState('')

    const submitForm = async(e) => {
        e.preventDefault()
        const url = 'https://registarationform.onrender.com/login'
        // const userDetails = {
        //     email: email,
        //     password: userPass,

        // }
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "email": "bhagya818gmail.com",
                "password": "bhagya123"
            }),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)

    }
    
  return (
      <div className='login-container'>
          <div className='Page-container'>
              <form  autoComplete="off" onSubmit={submitForm}>
                  <h3 className='loginPage-title'>LoginPage</h3>
                  <label htmlFor='email'>Email</label>
                  <div className='input-card'>
                      <input id='email' type="email" value={email} placeholder='admin1234@gmail.com' onChange={(e) => setEmail(e.target.value )} />
                      <p className='icons' ></p>
                      {/* <RiLockPasswordLine className='icons' /> */}
                  </div>&nbsp; <br /> <br />
                  <label htmlFor='Mailpassword'>password</label>
                  <div className='input-card'>
                      <input id='Mailpassword' type="password" value={userPass} placeholder='admin12' onChange={(e) => setPassword(e.target.value)} />
                      <p className='icons'></p>
                  </div>&nbsp; <br /> <br />

                  <button type='submit'>Login</button>
                  <p className='error-message'>{errorMessage}</p>
              </form>
          </div>
      </div>
  )
}
export default Login