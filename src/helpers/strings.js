function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelCaseToNormalString(str) {
  // Split the string into an array of words
  const words = str.split(/(?=[A-Z])/);

  // Join the words with spaces and convert to lowercase
  const result = words.join(" ").toLowerCase();

  return result;
}

const durationInDHMS = (milliseconds) => {
  // Convert milliseconds to seconds
  const seconds = milliseconds / 100;
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, remainingSeconds };
};

export { capitalizeFirstLetter, camelCaseToNormalString, durationInDHMS };
