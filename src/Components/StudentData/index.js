import React, { useState, useEffect } from 'react'
import Header from '../Header'
import './index.css'

const StudentData = () => {
    const status = localStorage.getItem('status')
    const [studentData, setStudentData] = useState([])
    const [password, setPassword] = useState('')
    const getName = status ==='false'? 'student': 'Master'
    const getStudentData = async () => {
        const url = `https://registrationapi-z2hj.onrender.com`
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, option)
        const data = await response.json()
        console.log(response,'student')
        const hide = "*".repeat(data[0].password.length)
        setPassword(hide)
        setStudentData(data)
    }
    const getMasterData = async () => {
     
        const url = `https://registrationapi-z2hj.onrender.com/all-admins`
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, option)
        const data = await response.json()
        setStudentData(data)
    }
    useEffect(() => {
        const status = localStorage.getItem("status")
        status === 'true' ? getMasterData() : getStudentData()
    }, []);
  
    return (<div className='account-main-container'>
        <div className='heade'>
            <Header />
        </div>
        <h5 className='heading-account'>Student account - Details</h5>
        <div className='master-card'>
            <ol className='master-data-card'>
                {studentData.map(each => (
                    <li className='account-sub-container'>
                        <p className='para'>{getName} Name-: {each.name}</p>
                        <p className='para'>Contact-: {each.email} </p>
                    </li>
                ))}
            </ol>
        </div>
    </div>
    )
}
export default StudentData