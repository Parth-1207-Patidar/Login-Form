import React, {useState, useRef} from 'react'
import { auth } from './auth'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const emailRef = useRef(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const validateEmail = (email) => {
        if (email.trim() === '') {
            setError('Email is required')
            return false
        }
        else if (!email.includes('@')) {
            setError('Email is invalid')
            return false
        }
        return true
    }

    const resetPassword = (email) => {
        if (!validateEmail(email)) {
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('If there is an account associated with this email, a password reset link has been sent to it');
            })
            .catch((err) => {
                if (err.code.includes('auth/user-not-found')) {
                    setError('User not found')
                }
                else if (err.code.includes('auth/invalid-email')) {
                    setError('Invalid email')
                }
                else if (err.code.includes('auth/too-many-requests')) {
                    setError('Too many requests. Try again later')
                }
                else if (err.code.includes('auth/network-request-failed')) {
                    setError('Network error. Try again later')
                }
                else if (err.code.includes('auth/user-disabled')) {
                    setError('User disabled')
                }
                else {
                    setError('Error resetting password')
                }
            })
    }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col gap-4 max-w-sm w-full p-4 border border-gray-300'>
            <h1 className='text-xl text-center mb-6'>Forgot Password</h1>
            <label htmlFor='email'>Enter your registered email</label>
            <input className='border border-gray-300' ref={emailRef} placeholder='Email' type='email' id='email' />
            {error && <span className='text-red-500'>{error}</span>}
            <button className='bg-blue-500 text-white p-1 rounded' onClick={() => resetPassword(emailRef.current.value)}>Reset Password</button>
            <div>
            <button className='text-xs' onClick={() => navigate('/')}>Remember Password? Login</button>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword