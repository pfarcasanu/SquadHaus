const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const monthdays = [...Array(32).keys()].slice(1);

const msDay = 86400000;

const dateOffset = (date, offset) => new Date(date.getTime() + offset * msDay);

const dateSuffix = (date) => {
  const day = date.getDate();
  const suffix = day % 10;
  if (suffix === 1 && date !== 11) return 'st';
  if (suffix === 2 && date !== 12) return 'nd';
  if (suffix === 3 && date !== 13) return 'rd';
  return 'th';
};

const prettyDate = (date) => {
  const day = weekdays[date.getDay()];
  const month = monthNames[date.getMonth()];
  return `${day}, ${month} ${date.getDate()}${dateSuffix(date)}`;
};

const isWeekDay = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const datesEqual = (d1, d2) => Math.floor(d1 / msDay) === Math.floor(d2 / msDay);

export {
  weekdays,
  monthdays,
  dateOffset,
  prettyDate,
  isWeekDay,
  datesEqual,
};
