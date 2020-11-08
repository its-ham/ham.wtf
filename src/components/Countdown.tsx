import React from 'react';
import Timer from 'react-compound-timer';

interface CountdownProps {
  date: Date;
}

function Countdown(props : CountdownProps) {
  const { date } = props;
  return (
    <Timer
      initialTime={date.getTime() - (new Date()).getTime()}
      direction="backward"
      formatValue={(s) => s.toString().padStart(2, '0')}
    >
      {() => (
        <>
          <Timer.Days />:<Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
        </>
)}
    </Timer>
  );

}

export default Countdown;
