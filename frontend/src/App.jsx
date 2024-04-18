import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Dashboard, SignIn } from './pages/admin'
import './App.css'
import { Home, Profile, Login, Register } from './pages/user'
import AdminNav from './components/AdminNav'
import { useEffect } from 'react'

function App() {
  const them = useSelector(state => state.them.currentThem)
  const user = useSelector(state => state?.user)?.user
  const admin = useSelector(state => state?.admin)?.admin

  const AdminRoute = ({ children, ...rest }) => {
    if (admin) {
      return <Navigate to={"/admin"}></Navigate>
    } else {
      return children
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
          <Route path='/admin-login' element={<AdminRoute><SignIn /></AdminRoute>} />
          <Route path='/' element={<Navbar />} >
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='/admin' element={<AdminNav />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
