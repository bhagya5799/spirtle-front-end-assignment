import { Switch, Route} from 'react-router-dom'
import ProtectRoute from './Components/ProtectRoute'
import Login from './Components/Login'
import Home from './Components/Home'
import './App.css'
import Register from './Components/Register'
import MasterData from './Components/MaserData'
import StudentData from './Components/StudentData'
import MasterLogin from './Components/MasterLogin'
const App = () => (
  <>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register/:status' component={Register} />
      <Route exact path='/master' component={MasterData} />
      <Route exact path='/student' component={StudentData} />
      <Route exact path='/masterlogin' component={MasterLogin} />
      <ProtectRoute exact path='/' component={Home} />
    </Switch>
  </>
)

export default App