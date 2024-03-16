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
    return time && money ?
    'In old age, we may have time and money, but health often falters' :
    money && health ?
    "As adults, we've got health and money, but time feels scarce" :
    time && health ? "When we're young, we've got time and energy, but not much money" : ''
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
      <p>{message}</p>
    </div>
    </>
  )
}

export default App
