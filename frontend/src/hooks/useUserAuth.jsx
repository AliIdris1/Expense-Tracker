import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosinstance"
import { API_PATHS } from "../utils/apiPaths"

export const useUserAuth = () => {
    const {user, clearUser, updateUser} = useContext(UserContext)
    const navigate = useNavigate()

useEffect(() => {
    if(user) return;

    let isMounted = true;

    
    const featchUserInfo = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)

            if(isMounted && response.data) {
                updateUser(response.data)
            }
        } catch (error) {
            console.error("Field to featch user info" ,error)
            if(isMounted) {
                clearUser()
                navigate("/logout")
            }
        }
    }

    featchUserInfo()
    
      return () => {
        isMounted= false
      }
}, [updateUser, clearUser, navigate])
}