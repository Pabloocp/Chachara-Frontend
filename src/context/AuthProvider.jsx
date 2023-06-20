import { createContext,useEffect,useState } from "react"
import { Global } from "../helpers/Global"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({})
    const [nums,setNums] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        authUser();
    }, [])

    const authUser = async() => {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if(!token || !user){
            setLoading(false)
            return false
        }

        // lo transformamos en un objeto
        const userObj = JSON.parse(user)
        const userID = userObj.id

        const request = await fetch(Global.url + "user/profile/" + userID,{
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization":token
            }
        })

        
        const requestCounters = await fetch(Global.url + "user/profileNums/" + userID,{
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization":token
            }
        })
        
        const userData = await request.json();
        const userNums = await requestCounters.json();
        setAuth(userData.user)
        setNums(userNums)
        setLoading(false)

    }

  return (
    <>
        <AuthContext.Provider value = {{auth,setAuth,nums,setNums,loading}}>
            {children}
        </AuthContext.Provider>
    </>
  )
}
export default AuthContext