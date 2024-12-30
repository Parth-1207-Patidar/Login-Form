import React, {useState} from 'react'
import Register from "./register";
import Login from "./login";

const Form = () => {
    
    const [hasAccount, setHasAccount] = useState(true);
    
    return (
        <div>
            {hasAccount ? 
                <div>
                    <Login setterFxn={setHasAccount} state={hasAccount}/>
                </div>
                :
                <div>
                    <Register setterFxn={setHasAccount} state={hasAccount} />
                </div>
            }
        </div>
    )
}

export default Form