
import {Routes,Route, BrowserRouter, Navigate, Link} from 'react-router-dom'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Login } from '../components/users/Login'
import { Register } from '../components/users/Register'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { FYP } from '../components/publications/FYP'
import { AuthProvider } from '../context/AuthProvider'
import { LogOut } from '../components/users/LogOut'
import { People } from '../components/users/People'
import { Config } from '../components/users/Config'
import { Following } from '../components/follows/Following'
import { Followers } from '../components/follows/Followers'
import { Profile } from '../components/users/Profile'
export const Routing = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
            <Route path='/' element={<PublicLayout/>}>
                <Route index element={<Login/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='register' element={<Register/>}></Route>
            </Route>
            <Route path='/chachara' element={<PrivateLayout/>}>
                <Route index element={<FYP/>}></Route>
                <Route path='feed' element={<FYP/>}></Route>
                <Route path='logout' element={<LogOut/>}></Route>
                <Route path='people' element={<People/>}></Route>
                <Route path='config' element={<Config/>}></Route>
                <Route path='siguiendo/:userId' element={<Following/>}></Route>
                <Route path='seguidores/:userId' element={<Followers/>}></Route>
                <Route path='perfil/:userId' element={<Profile/>}></Route>
           
            </Route>

            <Route path='*' element={
              <>
                 <h1>Error 404</h1>
                <Link to="/">Volver a Inicio</Link>
              </>
             }
            />

            
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}
