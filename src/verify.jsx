import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./auth";
import { onAuthStateChanged } from "firebase/auth";

const Verify = () => {
  const navigate = useNavigate();
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        checkVerification(user);
    })
    
    return (() => {
        unsub()
    })

  }, [])


  const checkVerification = (user) => {
    if (user){
        if (user.emailVerified){
            navigate('/dashboard')
        }
        else {
            setUserMessage('Email is not verified')
        }
    }
    else {
        setUserMessage('No user is signed in')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="mt-4 text-red-500">{userMessage}</p>
    </div>
  );
};

export default Verify;
