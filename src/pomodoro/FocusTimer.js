import React from 'react';
import { minutesToDuration } from '../utils/duration';

const FocusTimer = (props) => {

  const handleIncreaseFocusClick = () => {
    const newTime = Math.min(props.inputFocusTime + 5, 60);
    props.setInputFocusTime(newTime);
    props.setFocusTimer(newTime * 60);
  };

  const handleDecreaseFocusClick = () => {
    const newTime = Math.max(props.inputFocusTime - 5, 5);
    props.setInputFocusTime(newTime);
    props.setFocusTimer(newTime * 60);
  };

  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        Focus Duration: {minutesToDuration(props.inputFocusTime)}
      </span>
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={handleDecreaseFocusClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-minus" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={handleIncreaseFocusClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};
export default FocusTimer;
