import { useState } from 'react' 
import Login from './Login'
import SignUp from './SignUp'
import '../App.css' 

function WhiteCoverage({status}){
    const [logInOrSignUpForm,setLogInOrSignUpForm] = useState(true); 

    const handleLogInOrSignUpForm = () => {
        setLogInOrSignUpForm(previousState => !previousState); 
    }


    return(
        <>
            <div className={`whiteCoverageDiv ${status ? 'active' : ''}`}>
                <br/>
                <hr className='hr'/>
                <br/>
                <div className='LogInSignUpDiv'>
                    {logInOrSignUpForm ? <Login/> : <SignUp/>}
                    <hr className='hrAccount'/>
                    <br/>
                    <input type="button" value={`${logInOrSignUpForm ? 'Créer un compte' : 'Connexion'}`} className="mainButton" onClick={handleLogInOrSignUpForm}/>
                </div>
                
            </div>
        </>
    )
}

export default WhiteCoverage