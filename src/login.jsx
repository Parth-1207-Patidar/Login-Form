import React, {useRef, useState} from 'react'
import { auth } from './auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const [userMessage, setUserNewMessage] = useState('')

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const navigate = useNavigate()

    const validateForm = (email, password) => {
      const newErrors = {
        email: '',
        password: ''
      }

      if (email.trim() === '') {
        newErrors.email = 'Email is required'
      }
      else if (!email.includes('@')) {
        newErrors.email = 'Email is invalid'
      }

      if (password.trim() === '') {
        newErrors.password = 'Password is required'
      }
      else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }

      setErrors(newErrors)
      
      return !newErrors.email && !newErrors.password
    }

    const userLogin = (email, password) => {
      if (!validateForm(email, password)) {
        return
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          let userID = userCred.user.uid
          setUserNewMessage(`Welcome, ${userID}`)
          navigate('/dashboard')
        })
        .catch((err) => {
          if (err.code.includes('auth/user-not-found')) {
            setErrors({...errors, email: 'User not found'})
          }
          else if (err.code.includes('auth/wrong-password')) {
            setErrors({...errors, password: 'Incorrect password'})
          }
          else {
            setErrors({...errors, general: 'An error occurred. Please try again later'})
          }
        })
    }

  return (
    <div className="">

      <div className="flex flex-col gap-4">
        
        <div className="flex flex-col gap-2">
        <label htmlFor='email'>Email: </label>
        <input className='border' ref={emailRef} id='email' type="email" placeholder="Email" />
        {errors.email && <span>{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-2">
        <label htmlFor='password'>Password: </label>
        <input className='border' ref={passwordRef} id='password' type="password" placeholder="Password" />
        {errors.password && <span>{errors.password}</span>}
        </div>

        {userMessage && <span className='text-red-500'>{userMessage}</span>}

        {errors.general && <span className='text-red-500'>{errors.general}</span>}
        
        <button className='bg-blue-500 text-white p-2 rounded'
          onClick={() => {
            userLogin(emailRef.current.value, passwordRef.current.value);
          }}
        >
          Login
        </button>

        
        <div className='flex justify-between text-xs gap-2'>
        <button onClick={() => navigate('/forgotPassword')}>Forgot Password</button>
        </div>


      </div>
    </div>
  )
}

export default Login