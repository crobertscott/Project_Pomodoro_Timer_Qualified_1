import React from 'react';
import { minutesToDuration, secondsToDuration } from '../utils/duration';
import classNames from '../utils/class-names';

const SessionStatus = (props) => {
  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {props.sessionType === 'focus'
              ? `Focusing for ${minutesToDuration(
                  props.inputFocusTime
                )} minutes`
              : `On Break for ${minutesToDuration(
                  props.inputBreakTime
                )} minutes`}
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {props.sessionType === 'focus'
              ? secondsToDuration(props.focusTimer)
              : secondsToDuration(props.breakTimer)}{' '}
            remaining
          </p>
          <p
            className={classNames({
              invisible: props.isTimerRunning,
              visible: !props.isTimerRunning,
            })}>PAUSED
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: '20px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={
                props.sessionType === 'focus'
                  ? 100 - (props.focusTimer / (props.inputFocusTime * 60)) * 100
                  : 100 - (props.breakTimer / (props.inputBreakTime * 60)) * 100
              } 
              style={
                props.sessionType === 'focus'
                  ? {
                      width: `${
                        100 -
                        (props.focusTimer / (props.inputFocusTime * 60)) * 100
                      }%`,
                    }
                  : {
                      width: `${
                        100 -
                        (props.breakTimer / (props.inputBreakTime * 60)) * 100
                      }%`,
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SessionStatus;
