import React, {useState} from 'react'
import Register from "./register";
import Login from "./login";

const Form = () => {
    
    const [hasAccount, setHasAccount] = useState(true);
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex max-w-sm w-full flex-col gap-4 p-4 border border-gray-300">

                <div className="flex justify-between gap-4 w-full"> 
                    <button className='w-1/2 bg-gray-200 p-1' onClick={() => setHasAccount(true)}>Login</button>
                    <button className='w-1/2 bg-gray-200 p-1' onClick={() => setHasAccount(false)}>Register</button>
                </div>
                
                {hasAccount ? <Login /> : <Register />}
            </div>
        </div>
    )
}

export default Form