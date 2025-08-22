import React,{  createContext ,useState } from "react";

export const UserContext = createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    //Function to update user data
    const updateUser = (userData) => {
        setUser(userData)
    }
    
    
    //Function to claer user data (e.g., on logout)
    const claerUser = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            claerUser
        }}
        >
        {children}
        </UserContext.Provider>
    )
    
    
}

export default UserProvider