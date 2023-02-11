import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './index.css'

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrMessage] = useState('')
  const [toggle, setToggle] = useState(false)
  const { match } = props
  const { params } = match
  const { status } = params


  const submitForm = async (event) => {
    event.preventDefault()
    const student_api = 'https://registrationapi-z2hj.onrender.com/'
    const master_api = 'https://registrationapi-z2hj.onrender.com/admin'
    const url = status === 'true' ? student_api : master_api

    const userDetails = {
      id: uuidv4(),
      name: name,
      password: password,
      email: email
    }
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      if (status === 'true'){
        const { history } = props
        history.replace('/login')
      }
      else{
        const { history } = props
        history.replace('/masterlogin')
      }
   
    }
    else {
      setErrMessage('User Not register')
      setToggle(true)
    }
  }
  
  console.log(typeof(status))
  return (
    <div className='Register-form-container'>
      <form autoComplete="off" onSubmit={submitForm} className="r-form">
        <h4 className='loginPage-title'>Register Form</h4>
        <label htmlFor='email'>UserName</label>
        <div className='input-card'>
          <input id='email' type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
          <p className='icons' ></p>
        </div>&nbsp; <br /> <br /><label htmlFor='email'>Email</label>
        <div className='input-card'>
          <input id='email' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <p className='icons' ></p>
        </div>&nbsp; <br /> <br />
        <label htmlFor='Mailpassword'>password</label>
        <div className='input-card'>
          <input id='Mailpassword' type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          <p className='icons'></p>
        </div>&nbsp; <br /> <br />
        <button type='submit' className='login-btn'>Register</button>
        {toggle && <p className='error-message'>{errorMessage}</p>}
      </form>
    </div>
  )
}
export default Register