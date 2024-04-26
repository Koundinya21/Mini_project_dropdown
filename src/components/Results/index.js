// import {Component} from 'react'

// import './index.css'
// // import Results from '../Results'
// import DetailsContext from '../../ReactContext'

// class Timer extends Component {
//   state = {
//     ElapsedTimeInSeconds: 0,
//     timerMinutes: 10,
//   }

//   componentDidMount() {
//     this.Tick()
//   }

//   componentWillUnmount() {
//     this.clearInterval()
//   }

//   clearInterval = () => clearInterval(this.timerId)

//   IncrementOfElapsedTime = () => {
//     const {ElapsedTimeInSeconds, timerMinutes} = this.state
//     const TimerCompleted = timerMinutes * 60 === ElapsedTimeInSeconds

//     if (TimerCompleted) {
//       this.clearInterval()
//     } else {
//       this.setState(prev => ({
//         ElapsedTimeInSeconds: prev.ElapsedTimeInSeconds + 1,
//       }))
//     }
//   }

//   Tick = () => {
//     this.timerId = setInterval(this.IncrementOfElapsedTime, 1000)
//   }

//   clearTimer = () => {
//     clearInterval(this.timerId)
//   }

//   RenderMinutesDisplayed = () => {
//     const {ElapsedTimeInSeconds, timerMinutes} = this.state
//     const timeRemaining = timerMinutes * 60 - ElapsedTimeInSeconds

//     const Minutes = Math.floor(timeRemaining / 60)
//     const Seconds = Math.floor(timeRemaining % 60)

//     const stringifiedMin = Minutes > 9 ? Minutes : `0${Minutes}`
//     const stringifiedSec = Seconds > 9 ? Seconds : `0${Seconds}`

//     return `${stringifiedMin}:${stringifiedSec}`
//   }

//   RenderCompletedTime = () => {
//     // this.props.onElapsedTimeChange(this.state.elapsedTimeInSeconds)

//     const {ElapsedTimeInSeconds} = this.state
//     const Minutes = Math.floor(ElapsedTimeInSeconds / 60)
//     const Seconds = Math.floor(ElapsedTimeInSeconds % 60)

//     const Min = Minutes > 9 ? Minutes : `0${Minutes}`
//     const Sec = Seconds > 9 ? Seconds : `0${Seconds}`
//     return `${Min}:${Sec}`
//   }

//   render() {
//     // const clearedTime=null
//     // if(!isTimerRunning){
//     //     clearedTime=
//     // }

//     const completedTime = this.RenderCompletedTime()
//     console.log(completedTime)
//     return (
//       <>
//         <div className="timer-container">
//           <h1 className="heading">Time Left</h1>
//           <p className="time">{this.RenderMinutesDisplayed()}</p>
//           {/* <button type="button" onClick={this.clearTimer}>
//             click
//           </button> */}
//         </div>
//       </>
//     )
//   }

// }

// export default Timer

import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import './index.css'
import DetailsContext from '../../ReactContext'

const Timer = () => {
  const [timerMinutes] = useState(10)
  const [elapsedTime, setElapsedTime] = useState(0)
  const {setElapsedTimeInSeconds, setTheTimerChange} = useContext(
    DetailsContext,
  )

  const history = useHistory()

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1)
    }, 1000)
    if (elapsedTime === timerMinutes * 60) {
      clearInterval(timerId)
      history.replace('/results')
      setTheTimerChange(false)
    }
    setElapsedTimeInSeconds(elapsedTime)

    return () => {
      clearInterval(timerId)
    }
  }, [
    history,
    elapsedTime,
    timerMinutes,
    setElapsedTimeInSeconds,
    setTheTimerChange,
  ])

  //   useEffect(() => {
  //     if (elapsedTime === timerMinutes * 60) {
  //       clearInterval(timerId)
  //     }
  //     setElapsedTimeInSeconds(elapsedTime) // Update context value
  //   }, [elapsedTime, timerMinutes, setElapsedTimeInSeconds])

  //   const renderElapsedTime = () => {
  //     const minutes = Math.floor(elapsedTime / 60)
  //     const seconds = Math.floor(elapsedTime % 60)
  //     const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
  //     const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`
  //     return `${stringifiedMin}:${stringifiedSec}`
  //   }
  const RemainingTime = () => {
    const time = timerMinutes * 60 - elapsedTime
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`
    return (
      <p className="time">
        00:{stringifiedMin}:{stringifiedSec}
      </p>
    )
  }

  return (
    <>
      <div className="timer-container">
        <h1 className="heading">Time Left</h1>
        {/* <p className="time">{RemainingTime()}</p> */}
        {RemainingTime()}
      </div>
    </>
  )
}

export default Timer
