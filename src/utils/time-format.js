export function getCurrentTime(withAmPm = false) {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format hours and minutes to have leading zeros if needed
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (!withAmPm) {
    return `${formattedHours}:${formattedMinutes}`;
  }
  return `${formattedHours}:${formattedMinutes} ${amPm}`;
}
