import { withRouter, Link } from 'react-router-dom'
import { HiUserGroup } from 'react-icons/hi'
import { BiCheckDouble } from 'react-icons/bi'
import { GiDoubleRingedOrb } from 'react-icons/gi'
import './index.css' 


const Header = (props) => {
    const onClickLogout = () => {
        localStorage.removeItem("id")
        const { history } = props
        history.replace('/login')
    }
    const status = localStorage.getItem("status")
    console.log(status)
    const studentOrMaster = status === 'true' ? 'Student': 'Master'
    const toggleAll = status === 'true' ? 'Master' : 'Student'
  return (
    <div>
          <nav className='nav-container'>
              <div className='logo'>
                  <Link to="/" className='link'>
                      <h4 className='logo'>SPR<span className='it'>IT</span>LE<i className='s-logo'><GiDoubleRingedOrb /></i></h4>
                  </Link>
              </div>
              <div className='master-logout-button'>
                  <Link to="/student">
                      <button className='master'><i className='tick'>{toggleAll}<HiUserGroup /> <BiCheckDouble /></i></button>
                  </Link> 

                  <Link to="/master">
                      <button className='master'><i >{studentOrMaster}</i></button>
                  </Link>
                  <button onClick={onClickLogout} type='button' className='logout-btn'>Logout</button>
              </div>
          </nav>
    </div>
  )
}
export default withRouter(Header)