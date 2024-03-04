import './App.css'
import {Routes, Route} from 'react-router-dom'
import { LandingPage } from './views/LandingPage'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { Discover } from './views/Discover'
import { Navbar } from './views/Navbar'
import Footer from './views/Footer'
import { UserProfil } from './views/UserProfil'


function App() {

  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/discover" element={<Discover />} />
      <Route path=":id" element={<UserProfil />} />
     </Routes>
      <Footer />
    </>
  )
}

export default App
