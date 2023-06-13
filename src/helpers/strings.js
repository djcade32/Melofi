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

export { capitalizeFirstLetter, camelCaseToNormalString };
