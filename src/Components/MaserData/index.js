import React, { useState, useEffect } from 'react'
import Header from '../Header'
import './index.css'

const Account = () => {
    const [userData, setUserData] = useState([])
    const [password, setPassword] = useState('')
    useEffect(() => {
        const status = localStorage.getItem("status")
        status === 'true' ? getStudentData() : getMasterData()

    }, []);
    const getStudentData = async () => {
        const id = localStorage.getItem("id")
        const url = `https://registrationapi-z2hj.onrender.com/getOneData/${id}`
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }

        const response = await fetch(url, option)
        const data = await response.json()
        console.log(data)
        const hide = "*".repeat(data[0].password.length)
        setPassword(hide)
        setUserData(data[0])

    }
    const getMasterData = async () => {
        const id = localStorage.getItem("id")
        const url = `https://registrationapi-z2hj.onrender.com/get-full-data${id}`
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }

        const response = await fetch(url, option)
        const data = await response.json()
        const hide = "*".repeat(data[0].password.length)
        setPassword(hide)
        setUserData(data)
    }
    const status = localStorage.getItem("status")
    const StudentOrMaster = status === 'true' ? 'Master' : 'Student'

    return (<div className='account-main-container'>
        <div className='nav-bar'>
            <Header />
        </div>
        <div className='master-card'>
            <ol className='master-data-card'>
                <li className='account-sub-container'>
                    <p className='para'>Master Name-: {userData.name}</p>
                    <p className='para'>Contact-: {userData.email} </p>
                    <p className='para-x'>Password-: {password}</p>
                </li>
            </ol>

        </div>
        
        
        
    </div>
    )
}
export default Account