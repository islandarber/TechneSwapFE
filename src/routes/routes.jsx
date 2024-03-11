import { LandingPage } from '../views/LandingPage'
import { Login } from '../views/Login'
import { Register } from '../views/Register'
import { UserProfil } from '../views/UserProfil'
import { Discover } from '../views/Discover'
import {OtherUserProfil} from '../views/OtherUserProfil'

export const publicRoutes = [
      { path: '/', element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
];

export const privateRoutes = [
      { path: 'user', element: <UserProfil /> },
      { path: 'discover', element: <Discover /> },
      { path: 'discover/:id', element: <OtherUserProfil /> },
];