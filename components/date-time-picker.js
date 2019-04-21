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
    <div className="o-layout">
      <div className={'c-input o-layout__item u-3-of-5-at-small u-2-of-5-at-medium'}>
        <input
          className={'c-input__field'}
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
        />
      </div>
      <div className={'c-input o-layout__item u-2-of-5-at-small u-1-of-5-at-medium'}>
        <input
          className={'c-input__field'}
          type="time"
          value={time}
          onChange={event => setTime(event.target.value)}
        />
      </div>
    </div>
  );
};

export default DateTimePicker;

DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date)
};
