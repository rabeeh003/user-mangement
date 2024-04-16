import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/admin'
import './App.css'
import { Home, Profile, Login, Register } from './pages/user'

function App() {

  const them = useSelector((state) => state.them.currentThem)

  return (
    <div className={`${them} h-[100vh] bg-primary-foreground text-foreground`}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>} />
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
