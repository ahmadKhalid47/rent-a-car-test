export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Correct options with proper type values
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  return formattedDate;
}
export function formatDate2(dateString: string): string {
  const formattedDate = dateString.split("-").reverse().join("-");
  return formattedDate;
}

export function formatTime(timeString: string): string {
  // Create a new Date object using the provided time string
  const [hours, minutes] = timeString.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const hour12 = hours % 12 || 12; // If hour is 0 or 12, set it to 12

  // Return formatted time with AM/PM
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatId(id: any): any {
  // Extract the last 6 characters from the string
  return id.slice(-6);
}
export function formatListing(text: any) {
  return text.split(/\d+\.\s/).filter(Boolean);
}

export const formatDuration = (days: any) => {
  if (days >= 30) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    return `${months} month${months > 1 ? "s" : ""} ${
      remainingDays > 0
        ? `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
        : ""
    }`;
  } else if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return `${weeks} week${weeks > 1 ? "s" : ""} ${
      remainingDays > 0
        ? `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
        : ""
    }`;
  } else {
    return `${days} day${days > 1 ? "s" : ""}`;
  }
};

export function formatCreatedAtDate(timestamp: any) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${day}-${month}-${year}, ${formattedTime}`;
}

export function addDayInDate(baseDate: any, days: any) {
  let date: any = new Date(baseDate);
  date.setDate(date.getDate() + days);

  return date;
}

export function addMonthInDate(baseDate: any, months: any) {
  let date: any = new Date(baseDate);
  date.setMonth(date.getMonth() + months);

  return date;
}

export function addYearInDate(baseDate: any, years: any) {
  let date: any = new Date(baseDate);
  date.setFullYear(date.getFullYear() + years);

  return date;
}
