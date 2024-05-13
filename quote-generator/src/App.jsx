import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
function App() {
  const [advice, setAdvice] = useState('')

  const getAdivce = () => {
    const result = axios.get('https://api.adviceslip.com/advice')
                        .then(response => {
                          setAdvice(response.data.slip.advice)
                        })
                        .catch(error => {
                          console.log(error)
                        })
  }

  useEffect(() => {
    getAdivce()
  }, [])

  return (
    <div className="container">
      <div className="card">
        <h2 id="quote">{advice}</h2>
      </div>
      <button id='new-adivce' onClick={getAdivce}>Give me advice</button>
    </div>
  )
}

export default App
