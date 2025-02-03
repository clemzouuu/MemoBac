import { useState } from 'react'; 
import axios from 'axios';
import '../App.css' 

function SignUp() { 
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [errors, setErrors] = useState('');
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  function validateUsernameLength(username) {
    const trimmedUsername = username.trim();   
    return trimmedUsername.length >= 8 && trimmedUsername.length <= 30;  
  }

  function validateUsernameAlphanumeric(username) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;   
    return alphanumericRegex.test(username);
  }

  function validatePasswordLength(password) {
    const trimmedPassword = password.trim();   
    return trimmedPassword.length >= 8; 
  }

  const deleteErrorMessage = () => {
    let errorText = document.getElementsByClassName("error");
    if(errorText[0])
      setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!validateUsernameLength(username)){
      setError("Le nom d'utilisateur doit contenir de 8 à 30 caractères."); 
      return;
    }

    if(!validateUsernameAlphanumeric(username)){
      setError("Aucun caractère spécial n'est autorisé."); 
      return;
    }

    if(!validatePasswordLength(password)){
      setError("Le mot de passe doit contenir au moins 8.");
      return;
    }
    
    try { 
      setSuccess(true); 
      const response = await axios.post(`${baseUrl}/auth/signup`, {
        username,  
        password,
        status,
        subscription  
      });
      setSuccess(false); 
      localStorage.setItem('token', response.data.token); 
      window.location.href = "/home"

    } catch (error) {
      setSuccess(false); 
      if (error.response && error.response.data) {
        setErrors(error.response.data); 
      }  
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} onChange={deleteErrorMessage}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            className="inputUsername"
            required
          /> 
          <br/>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="inputPassword"
            required
          />
          <br/>
          {error && <p className='error'>{error}</p>} 

          {Object.keys(errors).length > 0 && (
            <div className="error-messages">
                {Object.keys(errors).map((field, index) => (
                    <p key={index} className="error">
                        {errors[field]}  
                    </p>
                ))}
            </div>
          )} 
          <input type="submit" value="Créer le compte" className="mainButton"/>
        </form> 
        <br/> 
      </div>
    </>
  )
}

export default SignUp
