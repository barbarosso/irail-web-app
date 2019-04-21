import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const DateTimePicker = ({ date: currentDate, onChange }) => {
  const currentTime = new Date(
    (currentDate && currentDate.getTime()) || Date.now()
  );
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

DateTimePicker.PropTypes = {
  date: PropTypes.instanceOf(Date)
};
