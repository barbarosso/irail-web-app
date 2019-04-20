import React, { useState, useEffect, Fragment } from "react";

const DateTimePicker = ({ timeStamp, onChange }) => {
  const currentTime = new Date(timeStamp || Date.now());
  const [date, setDate] = useState(currentTime.toISOString().substr(0, 10));
  const [time, setTime] = useState(currentTime.toTimeString().substr(0, 5));

  const convertDateAndTimeToDate = (date, time) => new Date(date + " " + time);

  useEffect(() => {
    if (onChange) {
      const newDate = convertDateAndTimeToDate(date, time);
      onChange(newDate);
    }
  }, [date, time]);

  return (
    <Fragment>
      <input
        type="date"
        value={date}
        onChange={event => setDate(event.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={event => setTime(event.target.value)}
      />
    </Fragment>
  );
};

export default DateTimePicker;
