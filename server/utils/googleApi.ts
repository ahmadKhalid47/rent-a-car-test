import fs from "fs";
import { drive_v3, google } from "googleapis";
import path from "path";
import mime from "mime-types";

import apikeys from "./apikey.json";
import { GaxiosResponse } from "gaxios";
import { Readable } from "stream";

const drive = google.drive({ version: "v3" });

export const getOrCreateUserFolder = async (
  authClient: any,
  userName: string
) => {
  const folderMimeType = "application/vnd.google-apps.folder";
  let folderId = "";

  // Search for the user's folder
  const searchResponse = await drive.files.list({
    auth: authClient,
    q: `mimeType='${folderMimeType}' and name='${userName}' and trashed=false`,
    fields: "files(id, name)",
    // spaces: "drive",
  });

  const folders = searchResponse?.data.files;

  if (folders && folders.length > 0) {
    // Folder exists, get the first one's ID
    folderId = folders[0].id as string;
  } else {
    // Folder doesn't exist, create it
    const folderMetadata = {
      name: userName,
      mimeType: folderMimeType,
    };

    const createResponse = drive.files.create({
      // auth: authClient,
      // resource: folderMetadata,
      // fields: 'id',
      auth: authClient,
      requestBody: folderMetadata,
      fields: "id",
    });

    // folderId = createResponse.data.id;
    folderId = (await createResponse).data.id as string;
  }

  return folderId;
};

export async function uploadFileApi(
  authClient: any,
  filePath: string,
  folderId: string,
  mimeType?: string
): Promise<drive_v3.Schema$File> {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    // const fileName = path.basename(filePath);
    // Change file name
    const inputFileExtension = path.extname(filePath);
    const today = new Date();
    const dateTime = today.toLocaleString();
    const fileName = `${dateTime}-video${inputFileExtension}`;

    // console.log("DrivePath:", filePath);
    mimeType = mimeType || mime.lookup(filePath) || "application/octet-stream";

    if (!mimeType) {
      return reject(new Error("Unable to determine MIME type for file"));
    }

    const fileMetaData = {
      name: fileName,
      parents: [`${folderId}`], // folder ID
      // parents: ["16YTpTJ1xRfIzmoRK3oJCDPwhe9PwQAh2"], // folder ID
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath), // Read the file stream
    };

    drive.files.create(
      {
        requestBody: fileMetaData,
        media: media,
        fields: "id",
      },
      (
        error: any,
        res: GaxiosResponse<drive_v3.Schema$File> | null | undefined
      ) => {
        if (error) {
          return reject(error);
        }
        if (res && res.data) {
          resolve(res.data);
        } else {
          return reject(new Error("No file data found"));
        }
      }
    );
  });
}

export async function uploadVideosApi(
  authClient: any,
  filePath: string,
  folderId?: string,
  mimeType?: string
): Promise<drive_v3.Schema$File> {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    // const fileName = path.basename(filePath);
    // Change file name
    const inputFileExtension = path.extname(filePath);
    const today = new Date();
    const dateTime = today.toLocaleString();
    const fileName = `${dateTime}-video${inputFileExtension}`;

    // console.log("DrivePath:", filePath);
    mimeType = mimeType || mime.lookup(filePath) || "application/octet-stream";

    if (!mimeType) {
      return reject(new Error("Unable to determine MIME type for file"));
    }

    const fileMetaData = {
      name: fileName,
      parents: ["16YTpTJ1xRfIzmoRK3oJCDPwhe9PwQAh2"], // folder ID
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath), // Read the file stream
    };

    drive.files.create(
      {
        requestBody: fileMetaData,
        media: media,
        fields: "id",
      },
      (
        error: any,
        res: GaxiosResponse<drive_v3.Schema$File> | null | undefined
      ) => {
        if (error) {
          return reject(error);
        }
        if (res && res.data) {
          resolve(res.data);
        } else {
          return reject(new Error("No file data found"));
        }
      }
    );
  });
}

// Function to share a folder and get the shareable link
export async function shareFolderAndGetLink(
  authClient: any,
  folderId: string
): Promise<string> {
  const drive = google.drive({ version: "v3", auth: authClient });

  // Make the folder public (or as per your sharing settings)
  await drive.permissions.create({
    fileId: folderId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  // Get the shareable link
  const result = await drive.files.get({
    fileId: folderId,
    fields: "webViewLink",
  });

  // return result.data.webViewLink;
  if (result.data.webViewLink) {
    return result.data.webViewLink;
  } else {
    return "";
  }
}

export async function uploadDocumentApi(
  authClient: any,
  filePath: string,
  folderId?: string,
  mimeType?: string
): Promise<drive_v3.Schema$File> {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    // Use the original file's name or provide a new naming convention here
    const fileName = path.basename(filePath);

    mimeType = mimeType || mime.lookup(filePath) || "application/octet-stream";

    if (!mimeType) {
      return reject(new Error("Unable to determine MIME type for file"));
    }

    const fileMetaData = {
      name: fileName,
      parents: [`${folderId}`], // folder ID
      // parents: ["1LZG8PhhoHhV-KZAc6TtjYS1TJG_YE4nk"], // folder ID
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath), // Read the file stream
    };

    drive.files.create(
      {
        requestBody: fileMetaData,
        media: media,
        fields: "id",
      },
      (
        error: any,
        res: GaxiosResponse<drive_v3.Schema$File> | null | undefined
      ) => {
        if (error) {
          return reject(error);
        }
        if (res && res.data) {
          resolve(res.data);
        } else {
          return reject(new Error("No file data found"));
        }
      }
    );
  });
}

export async function uploadPdfImageApi(
  authClient: any,
  fileStream: Readable,
  filePath: string,
  folderId: string,
  mimeType?: string
): Promise<drive_v3.Schema$File> {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    // Use the original file's name or provide a new naming convention here
    const fileName = path.basename(filePath);

    mimeType = mimeType || mime.lookup(filePath) || "application/octet-stream";

    if (!mimeType) {
      return reject(new Error("Unable to determine MIME type for file"));
    }

    const fileMetaData = {
      name: fileName,
      parents: folderId ? [folderId] : [], // folder ID or empty if not provided
    };

    const media = {
      mimeType: mimeType,
      body: fileStream, // Use the file stream
    };

    drive.files.create(
      {
        requestBody: fileMetaData,
        media: media,
        fields: "id",
      },
      (
        error: any,
        res: GaxiosResponse<drive_v3.Schema$File> | null | undefined
      ) => {
        if (error) {
          return reject(error);
        }
        if (res && res.data) {
          resolve(res.data);
        } else {
          return reject(new Error("No file data found"));
        }
      }
    );
  });
}

const SCOPE = ["https://www.googleapis.com/auth/drive"];
export async function authorizeGoogleApi() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    // null,
    undefined,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

// Function to download a file from Google Drive
export async function downloadFileFromGoogleDrive(
  authClient: any,
  fileId: string
): Promise<Buffer> {
  const drive = google.drive({ version: "v3", auth: authClient });
  const res = await drive.files.get(
    { fileId: fileId, alt: "media" },
    { responseType: "stream" }
  );

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    res.data
      .on("end", () => {
        resolve(Buffer.concat(chunks));
      })
      .on("error", (err) => {
        console.error("Error downloading the file.", err);
        reject(err);
      })
      .on("data", (chunk) => {
        chunks.push(chunk);
      });
  });
}
