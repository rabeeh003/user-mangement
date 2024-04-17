import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { SignIn } from './pages/admin'
import './App.css'
import { Home, Profile, Login, Register } from './pages/user'

function App() {
  const them = useSelector(state => state.them.currentThem)
  const user = useSelector(state => state?.user)?.user

  const PrivateRoute = ({ children, ...rest }) => {
    if (user) {
      return children
    } else {
      return <Navigate to={"/login"}></Navigate>
    }
  }

  const LoginRoute = ({ children, ...rest }) => {
    if (user) {
      return <Navigate to={"/"}></Navigate>
    } else {
      return children
    }
  }

  return (
    <div className={`${them} h-[100vh] bg-primary-foreground text-foreground`}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginRoute><Login /></LoginRoute>} />
          <Route path='/register' element={<LoginRoute><Register /></LoginRoute>} />
          <Route path='/admin-login' element={<SignIn />} />
          <Route path='/' element={<Navbar />} >
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
