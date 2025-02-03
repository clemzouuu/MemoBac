import { useState } from 'react'
import axios from 'axios';
import '../App.css' 

function Login() {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true); 

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        username,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      window.location.href = "/home"
      
    } catch (error) {
      setSuccess(false); 
      if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
      } else {
          setError('Une erreur est survenue lors de la connexion.');
      }
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
            className="inputUsername"
            required
          /> 
          <br/> 

          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            className="inputPassword"
            required
          />
         
 
          {error && <p className='error'>{error}</p>}
          <br/>
          <input type="submit" value="Connexion" className="mainButton"/> 
        </form>
        <br/>  
      </div>
    </>
  )
}

export default Login
