import React, { useContext, useState } from 'react'
import {Link, useNavigate } from "react-router-dom"
import Input from '../../components/Inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import ProfilePhotoSelctor from '../../components/Inputs/ProfilePhotoSelctor.jsx'
import axiosInstance from '../../utils/axiosinstance.js'
import { API_PATHS } from '../../utils/apiPaths.js'
import { UserContext } from '../../context/userContext.jsx'
import uploadImage from '../../utils/uploadImage.js'
import AuthLayout from '../Layouts/AuthLayout.jsx'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

    const navigate = useNavigate()

      const { updateUser} = useContext(UserContext)
    
  
    const handleSignUp = async (e) => {
      e.preventDefault();

      let profileImageUrl = "";

      if(!fullName)
      {
        setError("Please enter your name")
        return;
      }

      if(!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
          }
      
          if(!password) {
            setError("Please enter the password")
            return;
          }

          setError("")

      //Sign up api call
      try {

        //Upload image if prasent
        if(profilePic) {
          const imgUplaodres = await uploadImage(profilePic);
          profileImageUrl = imgUplaodres.imageUrl || "";
        }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
    });
      const  {token, user} = response.data
      

      if(token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.response && error.response.data.message)
      {
        setError(error.response.data.message)
      } else {
        setError("Something Went Wrong. Please try again.")
      }
    }
    }
  return (
  <AuthLayout>
    <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelctor image={profilePic} setImage={setProfilePic}/>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
          value={fullName}
          onChange={({target}) => setFullName(target.value)}
          lable={"Full Name"}
          placeholder={"jhon"}
          type={"text"}
          />

          <Input 
        value={email}
        onChange={({target}) => setEmail(target.value)}
        lable= "Email Addresss"
        placeholder= "jhon@example.conm"
        type = "text"
        />
        <div className='col-span-2'>
        <Input 
        value={password}
        onChange={({target}) => setPassword(target.value)}
        lable= "Passowrd"
        placeholder= "Min 8 Charcter"
        type = "password"
        />
        </div>
        </div>

        {error && <p className='text-red-500 text-xs p-2.5'>{error}</p>}
        
                <button className='ptn-primary' type='submit'>Sign Up</button>
        
                <p className='text-[13px] text-slate-300 mt-3'>Already have an account?{" "}
                  <Link className='font-medium text-primary underline' to={"/login"}>
                  Login
                  </Link>
                </p>
        
      </form>
    </div>
  </AuthLayout>
  )
}

export default SignUp