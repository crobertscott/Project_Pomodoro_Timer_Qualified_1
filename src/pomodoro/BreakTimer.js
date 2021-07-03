import React from 'react';
import { minutesToDuration } from '../utils/duration';

const BreakTimer = (props) => {

  const handleIncreaseBreakClick = () => {
    const newTime = Math.min(props.inputBreakTime + 1, 15);
    props.setInputBreakTime(newTime);
    props.setBreakTimer(newTime * 60);
  };

  const handleDecreaseBreakClick = () => {
    const newTime = Math.max(props.inputBreakTime - 1, 1);
    props.setInputBreakTime(newTime);
    props.setBreakTimer(newTime * 60);
  };
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-break">
        Break Duration: {minutesToDuration(props.inputBreakTime)}
      </span>
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-break"
          onClick={handleDecreaseBreakClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-minus" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-break"
          onClick={handleIncreaseBreakClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};
export default BreakTimer;
