import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


export const LogOut = () => {
    const {setAuth,setNums} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        //Vaciamos localstorage
        localStorage.clear()

        setAuth({})
        setNums({})

        navigate("/login")
    })

  return (
    <h1>Cerrando Sesión</h1>
  )
}
