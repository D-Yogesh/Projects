import { useState } from 'react'
import './styles/App.css'

function App() {
  const [time, setTime] = useState(false)
  const [money, setMoney] = useState(false)
  const [health, setHealth] = useState(false)
  const [lastState, setLastState] = useState(null)

  const onChangeTime = (evt) => {
    setTime(!time)
    if(money && health){
      if(lastState === 'money'){
        setHealth(false)
      }else{
        setMoney(false)
      }
    }
    setLastState(evt.target.value)
  }
  const onChangeMoney = (evt) => {
    setMoney(!money)
    if(time && health){
      if(lastState === 'time'){
        setHealth(false)
      }else{
        setTime(false)
      }
    }
    setLastState(evt.target.value)
  }
  const onChangeHealth = (evt) => {
    setHealth(!health)
    if(time && money){
      if(lastState === 'time'){
        setMoney(false)
      }else{
        setTime(false)
      }
    }
    setLastState(evt.target.value)
  }

  const showMessage = () => {
    const oldAge = {
      title: "Old age stage",
      quote: "In old age, we may have time and money, but health often declines",
      description: "This stage marks the later years of life, usually beginning around retirement age and continuing until the end of life. It is characterized by a decline in physical health and often a decrease in mobility and energy levels. Older adults may have more free time and financial resources. However, they may also face health challenges that can impact their quality of life and independence."
    }

    const adulthood = {
      title: "Adulthood stage",
      quote: "As adults, we've got health and money, but time feels scarce",
      description: "This stage typically begins after adolescence and extends throughout most of a person's life. It is characterized by independence, responsibility, and the pursuit of personal and professional goals. Adults generally have the ability to work, earn money, and make important life choices. While they may enjoy good health and financial stability, they often feel constrained by limited time due to commitments such as work, family, and other obligations."
    }

    const childhood = {
      title: "Childhood stage",
      quote: "When we're young, we've got time and energy, but not much money",
      description: "This is the period of life when a person is young, typically from infancy to adolescence. During this stage, individuals are often dependent on caregivers, have ample time for play and learning, and possess abundant energy and vitality. However, they typically do not have their own financial resources or the autonomy to make major decisions."
    }

    
    return time && money ? oldAge :
          money && health ? adulthood :
          time && health ? childhood : null
  }

  const message = showMessage()
  return (
    <>
      <div className='container'>
        <div className='content-wrapper'>
          <div>
            <input type='checkbox' id='time' value={"time"} checked={time} onChange={ e => onChangeTime(e)}/>
            <label htmlFor='time'>Time</label>
          </div>
          <div>
            <input type='checkbox' id='money' value={"money"} checked={money} onChange={e => onChangeMoney(e)}/>
            <label htmlFor='money'>Money</label>
          </div>
          <div>
            <input type='checkbox' id='health' value={"health"} checked={health} onChange={e => onChangeHealth(e)}/>
            <label htmlFor='health'>Health</label>
          </div>
        </div>
    </div>
    <div className='message'>
      <p><strong>{message && message.title}</strong></p>
      <p>{message && <q className='quote'>{message.quote}</q>}</p>
      {/* <p className='description'>{message && message.description}</p> */}
    </div>
    </>
  )
}

export default App
