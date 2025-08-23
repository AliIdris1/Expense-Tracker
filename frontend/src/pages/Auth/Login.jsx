import React, { useContext, useState } from 'react'
import {Link, useNavigate } from "react-router-dom"
import Input from '../../components/Inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosinstance.js'
import { API_PATHS,  } from '../../utils/apiPaths.js'
import{ UserContext } from '../../context/userContext.jsx'
import AuthLayout from '../../components/layouts/AuthLayout.jsx'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser} = useContext(UserContext)

  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }

    if(!password) {
      setError("Please enter the password")
      return;
    }

    setError("")

    //Login api call
    try {
      const respone = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
    });
      const  {token, user} = respone.data

      if(token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.respone && error.respone.data.message)
      {
        setError(error.respone.data.message)
      } else {
        setError("Something Went Wrong. Please try again.")
      }
    }

  }
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Pleas enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input 
        value={email}
        onChange={({target}) => setEmail(target.value)}
        lable= "Email Addresss"
        placeholder= "jhon@example.conm"
        type = "text"
        />
        <Input 
        value={password}
        onChange={({target}) => setPassword(target.value)}
        lable= "Passowrd"
        placeholder= "Min 8 Charcter"
        type = "password"
        />

        {error && <p className='text-red-500 text-xs p-2.5'>{error}</p>}

        <button className='ptn-primary' type='submit'>LOGIN</button>

        <p className='text-[13px] text-slate-300 mt-3'>Don't have an account?{" "}
          <Link className='font-medium text-primary underline' to={"/signup"}>
          SignUp
          </Link>
        </p>

      </form>
      </div>
    </AuthLayout>
  )
}

export default Login