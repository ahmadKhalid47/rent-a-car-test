import { mg } from "./email";

export function getPdfDocImageExtension(mimeType: string): string | null {
  const mimeTypeMap: { [key: string]: string } = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "image/jpeg": ".jpg",
    "image/pjpeg": ".jpg",
    "image/png": ".png",
  };

  return mimeTypeMap[mimeType] || null;
}

export async function sendEmailWithAttachment(
  to: string,
  subject: string,
  body: string,
  attachments: Array<{ filename: string; data: Buffer | string }>
): Promise<void> {
  // Convert each attachment to form-data format
  const attachmentData = attachments.map((att) => ({
    data: att.data,
    filename: att.filename,
  }));

  const emailData = {
    from: `Rapid Services Solutions <${process.env.EMAIL_FROM}>`,
    to: to,
    subject: subject,
    // text: body,
    html: body,
    attachment: attachmentData,
  };

  await mg.messages
    .create(process.env.MAILGUN_DOMAIN_NAME as string, emailData)
    .then((msg) => {
      console.log(`Email sent to ${to}`, msg);
    })
    .catch((error) => {
      console.error(`Error sending email to ${to}:`, error);
      throw error;
    });
}
