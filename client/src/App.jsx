import { useState } from 'react'
import WhiteCoverage from './Auth/WhiteCoverage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isWhiteCoverageShown,setIsWhiteCoverageShown] = useState(false);
  const [buttonTextBoolValue,setButtonTextBoolValue] = useState(false);
    let buttonTextValue  = !buttonTextBoolValue ? "Connexion" : "Fermer";

    const handleShowWhiteCoverage = () => {
        setIsWhiteCoverageShown(previousState => !previousState);
        setButtonTextBoolValue(previousState => !previousState);
    }

  return (
    <>
      <WhiteCoverage status={isWhiteCoverageShown}/>
      <h1 className={`${isWhiteCoverageShown ? 'blackTitle' : 'whiteTitle'}`} >MemoBac</h1>
      <input type="button" value={buttonTextValue} className="visitButton" onClick={handleShowWhiteCoverage}/>
      <video 
        src={'/video/graduation.mp4'} 
        autoPlay loop muted playsInline 
        className="homePageVideo"
      />
    </>
  )
}

export default App
