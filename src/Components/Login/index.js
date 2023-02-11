import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './index.css'

const Login = (props) => {
    const { history } = props
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [errorMessage, setErrMessage] = useState('')
    const [ToggleData, localData] = useState(true)

    const submitForm = async (e) => {
        console.log('ok')
        e.preventDefault()
        const userApi = 'https://registrationapi-z2hj.onrender.com/login'
        const masterApi = 'https://registrationapi-z2hj.onrender.com/adminLogin'
        const url = ToggleData ? userApi : masterApi
        const userDetails = {
            email: email,
            password: userPass,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()

        console.log(response)
        if (data.status === true) {
            console.log(data, 'dat')
            setErrMessage('')
            localStorage.setItem("status", ToggleData,)
            localStorage.setItem("id", data.id)
            history.replace("/")
        }
        else {
            setErrMessage(data.msg)
        }

    }
    const clickMaster = () => {
        localData(false)
    }
    
    const clickStudent = () => {
        localData(true)
    }

    const getId = localStorage.getItem("id")
    if (getId !== null) {
        return <Redirect to="/" />
    }
    
    return (
        <div className='login-container'>
            {ToggleData ? (<div className='choose-master-student'>
                <div className='Page-container'>
                    <form autoComplete="off" onSubmit={submitForm}>
                        <h4 className='loginPage-title'>{ToggleData ? 'User Login' : 'Admin Login'}</h4>
                        <label htmlFor='email'>Email</label>
                        <div className='input-card'>
                            <input id='email' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            <p className='icons' ></p>
                        </div>&nbsp; <br /> <br />
                        <label htmlFor='Mailpassword'>password</label>
                        <div className='input-card'>
                            <input id='Mailpassword' type="password" value={userPass} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            <p className='icons'></p>
                        </div>&nbsp; <br /> <br />
                        <button type='submit' className='login-btn'>Login</button>
                        <p className='error-message'>{errorMessage}</p>
                        <Link to={`register/${ToggleData}`} >
                            <p>Don't have Account </p>
                        </Link>
                        <Link>
                            <p onClick={clickMaster}>Not a Student? Login as a Master</p>
                        </Link>
                    </form>
                </div>
             
            </div>)
                : (
                    <div className='Page-container'>
                        <form autoComplete="off" onSubmit={submitForm}>
                            <h4 className='loginPage-title'>{ToggleData ? 'User Login' : 'Admin Login'}</h4>
                            <label htmlFor='email'>Email</label>
                            <div className='input-card'>
                                <input id='email' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                <p className='icons' ></p>
                            </div>&nbsp; <br /> <br />
                            <label htmlFor='Mailpassword'>password</label>
                            <div className='input-card'>
                                <input id='Mailpassword' type="password" value={userPass} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                                <p className='icons'></p>
                            </div>&nbsp; <br /> <br />

                            <button type='submit' className='login-btn'>Login</button>
                            <p className='error-message'>{errorMessage}</p>
                            <Link to={`register/${ToggleData}`} >
                                <p>Don't have Account </p>
                            </Link>
                            <Link>
                                <p onClick={clickStudent}>Not a master?Login as a Student</p>
                            </Link>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
export default Login
