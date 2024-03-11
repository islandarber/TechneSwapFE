import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Navbar } from './views/Navbar'
import Footer from './views/Footer'
import NotFound from './views/NotFound'
import { privateRoutes, publicRoutes } from './routes/routes'
import {useAuth} from './context/AuthContext'

function App() {
  const {token} = useAuth();

  return (
  <div className='app_container'>
    <Navbar />
    <div className='content'>
     <Routes>
      {publicRoutes.map(({path, element}) => (
        <Route key={path} path={path} element={!token ? element : <Navigate to='/'/>} />
      ))}
      {privateRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={token ? element : <Navigate to="/login" />}/>
        ))}

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace/>} />
     </Routes>
    </div>
      <Footer />
    </div>
  )
}

export default App
