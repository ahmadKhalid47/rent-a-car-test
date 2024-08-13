import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);

export const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY as string,
  url: "https://api.eu.mailgun.net"
  // url: `https://api.eu.mailgun.net/v3/${process.env.DomainName}`
});
