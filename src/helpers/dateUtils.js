function isDayBeforeCurrentDate(givenDate) {
  // Convert the givenDate to a Date object
  const dateToCompare = new Date(givenDate);

  // Get the current date
  const currentDate = new Date();

  // Set both dates to the same time of the day (to ignore time differences)
  dateToCompare.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Compare the dates
  const differenceInMilliseconds = currentDate - dateToCompare;

  // If the difference is exactly 1 day (86400000 milliseconds), then it's the day before
  return differenceInMilliseconds === 86400000;
}

function areTimestampsInSameDay(timestamp1, timestamp2) {
  // Convert timestamps to Date objects
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  // Check if the year, month, and day components are the same
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const convertISOTimestamp = (timestamp) => {
  const isoDate = new Date(timestamp);
  const convertedDate = isoDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return convertedDate[0] === "0" ? convertedDate.slice(1) : convertedDate;
};

const convertISOToISOLocal = (t) => {
  let z = t.getTimezoneOffset() * 60 * 1000;
  let tlocal = t - z;
  tlocal = new Date(tlocal);
  let iso = tlocal.toISOString();
  iso = iso.split(".")[0];

  return iso + "Z";
};

const dateInPast = (time) => {
  const currentDate = new Date();
  const endTime = new Date(time);

  // Rebuilding date for possibility of getting a date in the past
  // because it is a recurring event
  return convertISOToISOLocal(currentDate) > convertISOToISOLocal(endTime);
};

const timeStampToDateString = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};

export {
  isDayBeforeCurrentDate,
  areTimestampsInSameDay,
  convertISOToISOLocal,
  dateInPast,
  convertISOTimestamp,
  timeStampToDateString,
};
