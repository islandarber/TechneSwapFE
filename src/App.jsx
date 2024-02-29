import './App.css'
import {Routes, Route} from 'react-router-dom'
import { LandingPage } from './views/LandingPage'
import { Login } from './views/Login'
import { HowTo } from './views/HowTo'
import { Register } from './views/Register'
import { Discover } from './views/Discover'

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/howto" element={<HowTo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/discover" element={<Discover />} />
      
     </Routes>
    </>
  )
}

export default App
