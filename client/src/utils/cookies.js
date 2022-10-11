export function setCookie(name, value, daysTolive) {
  const date = new Date();
  date.setTime(date.getTime() + daysTolive * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toLocaleString("en-GB", { timeZone: "GMT" });
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
}

export function deleteCookie(name) {
  document.cookie =
    name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
}

export function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result;
  cArray.forEach((element) => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1);
    }
  });
  return result;
}
