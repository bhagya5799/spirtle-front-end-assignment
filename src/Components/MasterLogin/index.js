
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './index.css'

const Login = (props) => {
    const { history } = props
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [errorMessage, setErrMessage] = useState('')

    const submitForm = async (e) => {
        console.log('ok')
        e.preventDefault()
        const masterApi = 'https://registrationapi-z2hj.onrender.com/adminLogin'

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
        const response = await fetch(masterApi, options)
        const data = await response.json()

        console.log(response)
        if (data.status === true) {
            console.log(data, 'dat')
            setErrMessage('')
            localStorage.setItem("status", false,)
            localStorage.setItem("id", data.id)
            history.replace("/")
        }
        else {
            setErrMessage(data.msg)
        }

    }

    const getId = localStorage.getItem("id")
    if (getId !== null) {
        return <Redirect to="/" />
    }
    return (
        <div className='login-container'>
          <div className='choose-master-student'>
                <div className='Page-container'>
                    <form autoComplete="off" onSubmit={submitForm}>
                        <h4 className='loginPage-title'>Master Login</h4>
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
                        <Link to={`/register/${false}`} >
                            <p>Don't have Account </p>
                        </Link>
                        <Link to="/login">
                            <p >Not a Master? Login as a Student</p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login
