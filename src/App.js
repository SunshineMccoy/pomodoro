import React from 'react';
//import logo from './logo.svg';
import './App.css';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

function App() {
  return (
    <Pomodoro />
  )
}
class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: true,
      sessionLength: 25,
      breakLength: 5,
      sessionTime: 1500,
      breakTime: 300,
      running: false,
      start: null
    }
  };
  sessionClickUp = () => {
    if(this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        sessionTime: (this.state.sessionLength+1)*60
      })
    }
  };
  sessionClickDown = () => {
    if(this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        sessionTime: (this.state.sessionLength-1)*60
      })
    }
  };
  breakClickUp = () => {
    if(this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1,
        breakTime: (this.state.breakLength+1)*60
      })
    }
  };
  breakClickDown = () => {
    if(this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1,
        breakTime: (this.state.breakLength-1)*60
      });
    };
  };

  countDown = () => {
    if (this.state.session) {
      if(this.state.sessionTime > 0) {
        this.setState({
          sessionTime: this.state.sessionTime -1
        })
      } else {
        document.getElementById('beep').play();
        this.setState({
          session: false,
          sessionTime: this.state.sessionLength * 60
        })
      }
    } else {
      if(this.state.breakTime > 0) {
        this.setState({
          breakTime: this.state.breakTime -1
        })
      } else {
        document.getElementById('beep').play();
        this.setState({
          session: true,
          breakTime: this.state.breakLength * 60
        })
      }
    }
  };
  handleStart = () => {
    if (this.state.running) {
      this.setState({
        running: false,
      });
      clearInterval(this.state.start);
    } else {
      let start = setInterval(this.countDown, 1000);
      this.setState({
        running: true,
        start: start
      })
    }
  };
  reset = () => {
    clearInterval(this.state.start);
    document.getElementById('beep').load();
    this.setState({
      session: true,
      breakLength: 5,
      sessionLength: 25,
      sessionTime: 1500,
      breakTime: 300,
      running: false
    })
  }

 render() {
   return(
     <div className="wrapper">
       <Session length={this.state.sessionLength}
         handleClickUp={this.sessionClickUp}
         handleClickDown={this.sessionClickDown}/>
       <Break length={this.state.breakLength}
         handleClickUp={this.breakClickUp}
         handleClickDown={this.breakClickDown}/>
       <Time session={this.state.session}
         sessionRemaining={this.state.sessionTime}
         breakRemaining={this.state.breakTime}
         handleStart={this.handleStart}
         reset={this.reset}/>
     </div>
   )
 }
}

const Session = (props) => {
  return (
    <div id="task" className='box'>
      <h2 id='session-label'>Session Length</h2>
      <h3 id='session-length'>{props.length}</h3>
      <button id='session-increment' onClick={props.handleClickUp}>UP</button>
      <button id='session-decrement' onClick={props.handleClickDown}>DOWN</button>
    </div>
  )
}

const Break = (props) => {
  return (
    <div id='break' className='box'>
      <h2 id='break-label'>Break Length</h2>
      <h3 id='break-length'>{props.length}</h3>
      <button id='break-increment' onClick={props.handleClickUp}>UP</button>
      <button id='break-decrement' onClick={props.handleClickDown}>DOWN</button>
    </div>
  )
}

const Time = (props) => {
  let session = '';
  let remaining = 0;
  if (props.session) {
    session = 'Session';
    remaining = props.sessionRemaining
  } else {
    session = 'Break'
    remaining = props.breakRemaining
  }
  return (
    <div id='time' className='box'>
      <h2 id='timer-label'>{session}</h2>
      <h3 id="time-left">{Math.floor(remaining/60).toLocaleString(undefined, {minimumIntegerDigits: 2}) + ':' + (remaining%60).toLocaleString(undefined, {minimumIntegerDigits: 2})}</h3>
      <button id='start_stop' onClick={props.handleStart}>Start / Stop </button>
      <button id='reset'
        onClick={props.reset}
        >Reset</button>
      <audio id='beep'>
        <source src='http://soundbible.com/mp3/submarine-diving-alarm-daniel_simon.mp3' type='audio/mpeg'/>
      </audio>
    </div>
  )
}

export default App

