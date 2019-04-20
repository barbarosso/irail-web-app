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
  const time = `${currentDate.getHours()}${currentDate.getMinutes()}`;
  const date = `${currentDate.getFullYear()}${makeDoubleDigit(
    currentDate.getMonth() + 1
  )}${makeDoubleDigit(currentDate.getDay())}`;
  return {
    time,
    date
  };
};

export const duration = (departureTime, arrivalTime)=> {
  const startDate = new Date(departureTime * 1000)
  const endDate = new Date(arrivalTime * 1000)
  const _MS_PER_HOUR = 1000 * 60
  const difference = endDate - startDate;
  return Math.floor(difference / _MS_PER_HOUR);
},

export const  minutesToHoursAndMinutes = (totalMinutes)=>{
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes}`
}

const makeDoubleDigit = value => (value < 9 ? "0" + value : value);
