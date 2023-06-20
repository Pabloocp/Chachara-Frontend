
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'
import useAuth from '../../../hooks/useAuth'

export const PrivateLayout = () => {
  const {auth, loading} = useAuth()

  if(loading){
    return <h1>Cargando...</h1>
  }
  return (
   <>
   <Header></Header>
   <section className='layout__content'>
   {auth._id ? <Outlet></Outlet> : <Navigate to="/login"/>}      
    </section>
    
    <SideBar/>
    
    </>
    
  )
}
