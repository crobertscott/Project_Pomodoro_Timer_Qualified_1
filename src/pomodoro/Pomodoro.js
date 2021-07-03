import React, { useState } from 'react';
import classNames from '../utils/class-names';
import useInterval from '../utils/useInterval';
import BreakTimer from './BreakTimer';
import FocusTimer from './FocusTimer';
import SessionStatus from './SessionStatus';

function Pomodoro() {

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTimer, setFocusTimer] = useState(1500);
  const [breakTimer, setBreakTimer] = useState(300);

  const [inputBreakTime, setInputBreakTime] = useState(5);
  const [inputFocusTime, setInputFocusTime] = useState(25);
  const [sessionType, setSessionType] = useState('focus');

  const [isSessionStopped, setIsSessionStopped] = useState(true);

  useInterval(
    () => {
      const audioEl = document.getElementsByClassName('audio-element')[0];

      if (sessionType === 'focus') {
        setBreakTimer(inputBreakTime * 60);
        setFocusTimer(Math.max(focusTimer - 1, 0));
        if (focusTimer === 0) {
          audioEl.play();
          setSessionType('break');
        }
      }

      if (sessionType === 'break') {
        setFocusTimer(inputFocusTime * 60);
        setBreakTimer(Math.max(breakTimer - 1, 0));
        if (breakTimer === 0) {
          audioEl.play();
          setSessionType('focus');
        }
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsSessionStopped(false);
    setIsTimerRunning((prevState) => !prevState);
  }

  function stopSession() {
    setIsTimerRunning(false);
    setIsSessionStopped(true);
    setFocusTimer(1500);
    setBreakTimer(300);
    setInputBreakTime(5);
    setInputFocusTime(25);
  }

  return (
    <div className="pomodoro">
      <audio className="audio-element">
        <source src="https://bigsoundbank.com/UPLOAD/mp3/1482.mp3"></source>
      </audio>
      <div className="row">
        <div className="col">
          <FocusTimer
            setFocusTimer={setFocusTimer}
            setInputFocusTime={setInputFocusTime}
            inputFocusTime={inputFocusTime}
            isTimerRunning={isTimerRunning}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <BreakTimer
              setBreakTimer={setBreakTimer}
              setInputBreakTime={setInputBreakTime}
              isTimerRunning={isTimerRunning}
              inputBreakTime={inputBreakTime}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  'oi-media-play': !isTimerRunning,
                  'oi-media-pause': isTimerRunning,
                })}
              />
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSession}
              disabled={!isTimerRunning}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {isSessionStopped ? null : (
          <SessionStatus
            inputFocusTime={inputFocusTime}
            inputBreakTime={inputBreakTime}
            focusTimer={focusTimer}
            breakTimer={breakTimer}
            sessionType={sessionType}
            isTimerRunning={isTimerRunning}
          />
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
