import React from 'react'

import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import './index.css'

const Login = (props) => {
    const { history } = props
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [errorMessage, setErrMessage] = useState('')
    const [ToggleData, localData] = useState(true)
    const [toggle, setToggle] = useState(true)


    const submitForm = async (e) => {
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

    const clickUseBtn = () => {
        setToggle(false)
        localData(true)

    }
    const clickAdminBtn = () => {
        setToggle(false)
        localData(false)

    }
    const getId = localStorage.getItem("id")
    if (getId !== null) {
        return <Redirect to="/" />
    }

    return (
        // <div className='login-container'>
        //     {toggle ? (<div className='choose-master-student'>
        //         <div className='Page-container'>
        //             <form autoComplete="off" onSubmit={submitForm}>
        //                 <h4 className='loginPage-title'>{ToggleData ? 'User Login' : 'Admin Login'}</h4>
        //                 <label htmlFor='email'>Email</label>
        //                 <div className='input-card'>
        //                     <input id='email' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        //                     <p className='icons' ></p>
        //                 </div>&nbsp; <br /> <br />
        //                 <label htmlFor='Mailpassword'>password</label>
        //                 <div className='input-card'>
        //                     <input id='Mailpassword' type="password" value={userPass} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        //                     <p className='icons'></p>
        //                 </div>&nbsp; <br /> <br />
        //                 {/* <button type='submit' className='login-btn'>Login</button> */}
        //                 <p className='error-message'>{errorMessage}</p>
        //                 <button onClick={clickUseBtn} className="user">User Login</button>
        //                 <button onClick={clickAdminBtn} className="user">Admin Login</button>
        //                 <Link to='/' >
        //                     <p>Don't have Account </p>
        //                 </Link>
        //             </form>
        //         </div>
             
        //     </div>)
        //         : (
        //             <div className='Page-container'>
        //                 <form autoComplete="off" onSubmit={submitForm}>
        //                     <h4 className='loginPage-title'>{ToggleData ? 'User Login' : 'Admin Login'}</h4>
        //                     <label htmlFor='email'>Email</label>
        //                     <div className='input-card'>
        //                         <input id='email' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        //                         <p className='icons' ></p>
        //                     </div>&nbsp; <br /> <br />
        //                     <label htmlFor='Mailpassword'>password</label>
        //                     <div className='input-card'>
        //                         <input id='Mailpassword' type="password" value={userPass} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        //                         <p className='icons'></p>
        //                     </div>&nbsp; <br /> <br />

        //                     <button type='submit' className='login-btn'>Login</button>
        //                     <p className='error-message'>{errorMessage}</p>
        //                     <Link to='/' >
        //                         <p>Don't have Account </p>
        //                     </Link>
        //                 </form>
        //             </div>
        //         )
        //     }

        // </div>
        <div className='login-container'>
            {toggle ? (<div className='choose-master-student'>
                <h3 className='wellcome'>Well come Login page</h3>
                <button onClick={clickUseBtn} className="user">User Login</button>
                <button onClick={clickAdminBtn} className="user">Admin Login</button>
            </div>)
                : (
                    <div className='Page-container'>
                        <form autoComplete="off" onSubmit={submitForm}>
                            <h4 className='loginPage-title'>{ToggleData ? 'User Login' : 'Admin Login' }</h4>
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
                            <Link to='/' >
                                <p>Don't have Account </p>
                            </Link>
                        </form>
                    </div>
                )
            }

        </div>
    )
}
export default Login
