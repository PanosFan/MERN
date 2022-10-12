export default function capitalizeFirstLetter(str) {
  let strVal = "";
  str = str.split(" ");
  for (let chr = 0; chr < str.length; chr++) {
    strVal +=
      str[chr].substring(0, 1).toUpperCase() +
      str[chr].substring(1, str[chr].length) +
      " ";
  }
  return strVal;
}
