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
