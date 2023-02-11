import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import DeleteQuestion from '../DeleteQuestion'
import { v4 as uuidv4 } from 'uuid'

import './index.css'


const chooseNumber = [
  {
    id: "zero",
    name: "Zero"
  },
  {
    id: "one",
    name: "One"
  },
  {
    id: "two",
    name: "Two"
  },
  {
    id: "three",
    name: "Three"
  },
  {
    id: "four",
    name: "Four"
  },
  {
    id: "five",
    name: "Five"
  },
  {
    id: "six",
    name: "Six"
  },
  {
    id: "seven",
    name: "Seven"
  },
  {
    id: "eight",
    name: "Eight"
  },
  {
    id: "nine",
    name: "Nine"
  }
]

const chooseOperator = [
  {
    id: "plus",
    name: "Pluse"
  },
  {
    id: "minus",
    name: "Minus"
  },
  {
    id: "times",
    name: "Times"
  },
  {
    id: "dividedBy",
    name: "DividedBy"
  },
]

const Home = () => {
  const [firstNbr, setfirstNbr] = useState([chooseNumber[0].id])
  const [operator, setOperator] = useState([chooseOperator[0].id])
  const [secondNbr, setsecondNbr] = useState([chooseNumber[0].id])
  const [resultData, setResultData] = useState([])


  const status = localStorage.getItem("status")

  const checkMasterStudentData = () => {
    status === 'true' ? studentView() : masterView()
  }
  useEffect(() => {
    checkMasterStudentData()
  }, [])


  const studentView = async () => {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    const response = await fetch('https://registrationapi-z2hj.onrender.com/all-questions', options)
    const data = await response.json()
    setResultData(data)
  }

  const masterView = async () => {
    const id = localStorage.getItem("id")
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
    const response = await fetch(`https://registrationapi-z2hj.onrender.com/getMaster-question/${id}`, options)
    const data = await response.json()
    setResultData(data)

  }


  const sendQuestion = async (masterName, id, answer) => {
    const url = 'https://registrationapi-z2hj.onrender.com/question'
    const questionData = {
      id: uuidv4(),
      question: `${firstNbr} (${operator}) ${secondNbr} = ${answer}`,
      masterId: id,
      masterName: masterName
    }
    const options = {
      method: "POST",
      body: JSON.stringify(questionData),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      setfirstNbr(chooseNumber[0].id)
      setOperator(chooseOperator[0].id)
      setsecondNbr(chooseNumber[0].id)
      checkMasterStudentData()
    }
  }
  const ClickButton = async () => {
    function checkNum(num, temp) {
      if (temp === undefined) {
        return num;
      } else {
        return temp(num)
      }
    }
    function zero(temp) {
      return checkNum(0, temp)
    }
    function one(temp) {
      return checkNum(1, temp)
    }
    function two(temp) {
      return checkNum(2, temp)
    }
    function three(temp) {
      return checkNum(3, temp)
    }
    function four(temp) {
      return checkNum(4, temp)
    }
    function five(temp) {
      return checkNum(5, temp)
    }
    function six(temp) {
      return checkNum(6, temp)
    }
    function seven(temp) {
      return checkNum(7, temp)
    }
    function eight(temp) {
      return checkNum(8, temp)
    }
    function nine(temp) {
      return checkNum(9, temp)
    }

    function plus(right) {
      return function (left) {
        return left + right
      }
    }
    function minus(right) {
      return function (left) {
        return left - right
      }
    }
    function times(right) {
      return function (left) {
        return left * right
      }
    }
    function dividedBy(right) {
      return function (left) {
        return Math.round(left / right)
      }
    }
    const answer = eval(`${firstNbr}(${operator}(${secondNbr}()))`)
    const id = localStorage.getItem("id")
    const url = `https://registrationapi-z2hj.onrender.com/get-full-data/${id}`
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const masterName = data[0].name

    if (Number.isInteger(answer)) {
      sendQuestion(masterName, id, answer)
    }
  }

  const onDeleteButton = async (id) => {
    const url = `https://registrationapi-z2hj.onrender.com/delete-question/${id}`
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      checkMasterStudentData()
    }
  }
  return (
    <div className='home-container'>
      <div className='header'>
        <Header />
      </div>

      <div className='input-output-container'>
        {status === 'true' ? (<div className='box'>
          <ol className="questions">
            {resultData.map(eachData => (
              <li className='li-container' key={eachData.id}>
                <p className='heading'>{eachData.question}</p>
                <p className='master-name'>Send By-:{eachData.masterName}  </p>

              </li>
            ))}
          </ol>
        </div>) : (<div className='box'>
          <ol className="questions">
            {resultData.map(eachData => (
              <li className='li-container' key={eachData.id}>
                <div className='cad'>
                  <p className='heading'>{eachData.question}</p>
                  <p className='master-name'>Send By-:{eachData.masterName}  </p>
                </div>
                <DeleteQuestion onDeleteButton={onDeleteButton} propElement={eachData.id} className="d-btn" />
              </li>
            ))}
          </ol>
        </div>)}
        {status === "false" && (<div className='select-input-box'>
          <select name="cars" id="cars" form="carform" value={firstNbr} onChange={(e) => setfirstNbr(e.target.value)} className="select-btn">
            {chooseNumber.map(nbr => (
              <option value={nbr.id} key={nbr.id}>{nbr.name}</option>
            ))}
          </select>
          <select name="cars" id="cars" form="carform" value={operator} onChange={(e) => setOperator(e.target.value)} className="select-btn">
            {chooseOperator.map(nbr => (
              <option value={nbr.id} key={nbr.id}>{nbr.name}</option>
            ))}
          </select>
          <select name="cars" id="cars" form="carform" value={secondNbr} onChange={(e) => setsecondNbr(e.target.value)} className="select-btn">
            {chooseNumber.map(nbr => (
              <option value={nbr.id} key={nbr.id}>{nbr.name}</option>
            ))}
          </select>
          <button onClick={ClickButton} type='button' className="click-btn">Calculate<BsFillArrowRightCircleFill /></button>
        </div>)}
      </div>
    </div>
  )
}
export default Home