/**
 * returns
 * @param {number} timeStamp
 *
 * @returns timeObject
 * time string The time is formatted as hhmm.
 * date string The date is formatted as ddmmyy.
 */
export const getAPIDateTimeFromTimeStamp = timeStamp => {
  const currentDate = new Date(timeStamp);
  const time = `${makeDoubleDigit(currentDate.getHours())}${makeDoubleDigit(
    currentDate.getMinutes()
  )}`;
  const date = `${makeDoubleDigit(currentDate.getDate())}${makeDoubleDigit(
    currentDate.getMonth() + 1
  )}${currentDate
    .getFullYear()
    .toString()
    .substr(2, 2)}`;
  return {
    time,
    date
  };
};

export const convertDateAndTimeToDate = (date, time) =>
  new Date(date + " " + time);

const makeDoubleDigit = value => (value < 9 ? "0" + value : value);

export const getDuration = (departureTime, arrivalTime) => {
  const startDate = new Date(departureTime * 1000);
  const endDate = new Date(arrivalTime * 1000);
  const _MS_PER_HOUR = 1000 * 60;
  const difference = endDate - startDate;
  return Math.floor(difference / _MS_PER_HOUR);
};

export const minutesToHoursAndMinutes = totalMinutes => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes}`;
};
