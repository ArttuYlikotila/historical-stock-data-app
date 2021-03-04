// Function that converts a date string format to another date string format
// @param {String} date, {Char} character used to split the input string
// @return {String} date with converted format
export function dateStringConversion(date, splitter) {
  const dateArr = date.split(splitter);
  let convertedDate;

  // mm-dd-yyyy => yyyy-mm-dd
  if (splitter === '/') {
    convertedDate = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
  }
  // yyyy-mm-dd => mm-dd-yyyy
  if (splitter === '-') {
    convertedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  }

  return convertedDate;
}

// Function that counts the absolute difference between two numbers
// @param {Number} int or float, {Number} int or float
// @return {Number} float rounded to two decimal accuracy
export function difference(a, b) {
  return +Math.abs(a-b).toFixed(2);
};

// Function that extracts an array from array of JSON-objects based on given dates
// NOTE: Starting date has larger index than the ending date because of the order of data
// @param {Array} JSON-objects, {JSON-Obj} dates
// @return {Array} JSON-objects
export function extractDateRange(data, dates) {
  // Make a deep copy of the data
  const dataCopy = JSON.parse(JSON.stringify(data));

  // Convert the given dates to correct format
  const start = dateStringConversion(dates.startDate, '-');
  const end = dateStringConversion(dates.endDate, '-');

  // Search the indexes of the objects containing the dates from the data array
  const startIndex = data.findIndex(row => row.Date === start);
  const endIndex = data.findIndex(row => row.Date === end);

  // Filter out all objects that are not between the index boundaries
  const range = dataCopy.filter((row, i) => i <= startIndex && i >= endIndex);

  return range;
}