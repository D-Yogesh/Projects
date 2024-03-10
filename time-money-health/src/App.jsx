import { useState } from 'react'

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
    'This is Oldage stage where person has time and money but not health' :
    money && health ?
    'This is Midage stage where person has time and money but not time' :
    time && health ? 'This is childhood stage where person has time and health but not money' : ''
  }
  return (
    <>
      <div>
        <input type='checkbox' value={"time"} checked={time} onChange={ e => onChangeTime(e)}/>
        <span>Time</span>
      </div>
      <div>
        <input type='checkbox' value={"money"} checked={money} onChange={e => onChangeMoney(e)}/>
        <span>Money</span>
      </div>
      <div>
        <input type='checkbox' value={"health"} checked={health} onChange={e => onChangeHealth(e)}/>
        <span>Health</span>
      </div>
      <div>
        <p>{showMessage()}</p>
      </div>
    </>
  )
}

export default App
