import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import Category from "../models/category";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import { v4 as uuidv4 } from "uuid";
import nodeCron from "node-cron";
import Student from "../models/student";
import Certificate from "../models/certificate";
import Teacher from "../models/teacher";
import Notification from "../models/notification";
import Course from "../models/course";
import User from "../models/user";
import Agent from "../models/agent";
import { uploadOnCloudinary } from "../utils/cloudinary";
import {
  authorizeGoogleApi,
  downloadFileFromGoogleDrive,
  getOrCreateUserFolder,
  shareFolderAndGetLink,
  uploadDocumentApi,
  uploadFileApi,
  uploadPdfImageApi,
} from "../utils/googleApi";
import path from "path";
import {
  PathLike,
  createReadStream,
  existsSync,
  statSync,
  unlink,
  unlinkSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";

//
import { studentAddEmail } from "../utils/studentAddEmail";
import { mg } from "../utils/email";
import { google } from "googleapis";
import { Readable } from "stream";
import {
  getPdfDocImageExtension,
  sendEmailWithAttachment,
} from "../utils/helpers";
import { log, promisify } from "util";
import Invoice from "../models/invoice";

export const generateOnlineFormUrl = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    // const expiresAt = new Date(Date.now() + oneDayInMilliseconds);
    const uniqueUrl = uuidv4();

    const newForm = new Student({
      uniqueUrl,
      courseId: req.body.courseId ? req.body.courseId : null,
      courseTitle: req.body.courseTitle ? req.body.courseTitle : "",
      // expiresAt,
      isSubmitted: false,
    });

    await newForm
      .save()
      .then(() => {
        return res.json({
          success: true,
          message: "Unique url generated successfully.",
          uniqueUrl,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while generating url", 500));
      });
  }
);
export const registerAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role, lastName, username, firstName } = req.body;
      const hashedPassword = await hash(password, 12);

      const newUser = new User({
        lastName,
        username,
        firstName,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();

      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error: any) {
      res
        .status(404)
        .json({
          success: false,
          message: `user is not register >>>> ${error.message}`,
        });
    }
  }
);
export const addCategory = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return next(new ErrorHandler("Category already exists", 400));
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category,
    });
  }
);
export const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.array()[0].msg;
        return next(new ErrorHandler(err, 400));
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user.password = "";

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // sameSite: "none",
      });
      res.status(200).json(user);
    } catch (error) {
      console.log("Error: ", error);
      return next(new ErrorHandler("Error while login", 500));
    }
  }
);
export const getProfile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;

      let userData;
      if (userId) {
        userData = await User.findById(userId);
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching user data" });
    }
  }
);
//
export const adminOnlineForm = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = new Student({
      ...req.body,
      email: req.body.email.toLowerCase(),
      // expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      addedByAdmin: true,
      isSubmitted: true,
    });

    const base64Image = req.file?.buffer.toString("base64");

    if (base64Image) {
      form.avatar = base64Image;
    }

    await form
      .save()
      .then(() => {
        return res.json({
          success: true,
          message: "Form submitted successfully.",
        });
      })
      .catch((err: any) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error submitting form", 500));
      });
  }
);
//

let gfsBucket: mongoose.mongo.GridFSBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "teacherfiles", // collection name
  });
});
export const addNewTeacher = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
      return next(
        new ErrorHandler("Teacher profile with this email already exists", 400)
      );
    }

    const newTeacher = new Teacher({
      ...req.body,
      email: req.body.email.toLowerCase(),
    });

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const cvFile = fileWithFields.cvFile ? fileWithFields.cvFile[0] : null;
    const aetCertificateFile = fileWithFields.aetCertificateFile
      ? fileWithFields.aetCertificateFile[0]
      : null;
    const cmCertificateFile = fileWithFields.cmCertificateFile
      ? fileWithFields.cmCertificateFile[0]
      : null;
    const lv3FirstAidCert = fileWithFields.lv3FirstAidCert
      ? fileWithFields.lv3FirstAidCert[0]
      : null;
    const cpdFile = fileWithFields.cpdFile ? fileWithFields.cpdFile[0] : null;
    const lv3PiCert = fileWithFields.lv3PiCert
      ? fileWithFields.lv3PiCert[0]
      : null;
    const piLicense = fileWithFields.piLicense
      ? fileWithFields.piLicense[0]
      : null;
    const otherDocument = fileWithFields.otherDocument
      ? fileWithFields.otherDocument[0]
      : null;

    if (!cvFile) {
      return next(new ErrorHandler("CV file is required", 400));
    }

    if (!aetCertificateFile) {
      return next(new ErrorHandler("AET Certificate file is required", 400));
    }

    if (!cmCertificateFile) {
      return next(
        new ErrorHandler(
          "Conflict Management Certificate file is required",
          400
        )
      );
    }

    const validateFile = (
      file: Express.Multer.File | null
      // errorMessage: string
    ) => {
      // if (!file) {
      //   return next(new ErrorHandler(errorMessage, 400));
      // }
      if (!file) {
        return;
      }

      const extension = getPdfDocImageExtension(file ? file.mimetype : "");
      if (!extension) {
        return next(new ErrorHandler("Unsupported file type", 400));
      }
    };

    // validateFile(cvFile, "CV file is required");
    validateFile(cvFile);
    validateFile(aetCertificateFile);
    validateFile(cmCertificateFile);
    validateFile(lv3FirstAidCert);
    validateFile(cpdFile);
    validateFile(lv3PiCert);
    validateFile(piLicense);
    validateFile(otherDocument);

    const authClient = await authorizeGoogleApi();

    // Helper function to convert buffer to stream
    const bufferToStream = (buffer: Buffer): Readable => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // End of stream
      return stream;
    };

    interface FileMetaData {
      id: string;
      mimeType: string;
    }

    // Helper function to upload file to Google Drive and get file ID
    const uploadToGoogleDrive = async (
      file: Express.Multer.File,
      folderId: string
    ): Promise<FileMetaData> => {
      const filePath = file.originalname;
      const mimeType = file.mimetype;
      const fileStream = bufferToStream(file?.buffer);

      try {
        const driveFile = await uploadPdfImageApi(
          authClient,
          fileStream,
          filePath,
          folderId,
          mimeType
        );
        if (!driveFile) {
          throw new Error("Error uploading file to Google Drive");
        }
        return {
          id: driveFile.id as string,
          mimeType: mimeType,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Error uploading file to Google Drive");
      }
    };

    try {
      // Upload CV file
      const folderId = "1bwIdbJxfNF9Zw_l7386LkY-G26VpXF7X";
      const cvFileMetaData = await uploadToGoogleDrive(cvFile, folderId);

      // Upload AET Certificate file
      const aetCertificateMetaData = await uploadToGoogleDrive(
        aetCertificateFile,
        folderId
      );

      // Upload CM Certificate file
      const cmCertificateMetaData = await uploadToGoogleDrive(
        cmCertificateFile,
        folderId
      );

      let lv3FirstAidCertMetaData;
      let cpdFileMetaData;
      let lv3PiCertMetaData;
      let piLicenseMetaData;
      let otherDocumentMetaData;

      if (lv3FirstAidCert) {
        lv3FirstAidCertMetaData = await uploadToGoogleDrive(
          lv3FirstAidCert,
          folderId
        );
      }
      if (cpdFile) {
        cpdFileMetaData = await uploadToGoogleDrive(cpdFile, folderId);
      }

      if (lv3PiCert) {
        lv3PiCertMetaData = await uploadToGoogleDrive(lv3PiCert, folderId);
      }
      if (piLicense) {
        piLicenseMetaData = await uploadToGoogleDrive(piLicense, folderId);
      }
      if (otherDocument) {
        otherDocumentMetaData = await uploadToGoogleDrive(
          otherDocument,
          folderId
        );
      }

      newTeacher.cvFile = cvFileMetaData.id;
      newTeacher.cvFileMimeType = cvFileMetaData.mimeType;
      newTeacher.aetCertificateFile = aetCertificateMetaData.id;
      newTeacher.aetCertificateFileMimeType = aetCertificateMetaData.mimeType;
      newTeacher.cmCertificateFile = cmCertificateMetaData.id;
      newTeacher.cmCertificateFileMimeType = cmCertificateMetaData.mimeType;

      if (lv3FirstAidCertMetaData) {
        newTeacher.lv3FirstAidCert = lv3FirstAidCertMetaData.id;
        newTeacher.lv3FirstAidCertMimeType = lv3FirstAidCertMetaData.mimeType;
      }

      if (cpdFileMetaData) {
        newTeacher.cpdFile = cpdFileMetaData.id;
        newTeacher.cpdFileMimeType = cpdFileMetaData.mimeType;
      }

      if (lv3PiCertMetaData) {
        newTeacher.lv3PiCert = lv3PiCertMetaData.id;
        newTeacher.lv3PiCertMimeType = lv3PiCertMetaData.mimeType;
      }
      if (piLicenseMetaData) {
        newTeacher.piLicense = piLicenseMetaData.id;
        newTeacher.piLicenseMimeType = piLicenseMetaData.mimeType;
      }
      if (otherDocumentMetaData) {
        newTeacher.otherDocument = otherDocumentMetaData.id;
        newTeacher.otherDocumentMimeType = otherDocumentMetaData.mimeType;
      }

      newTeacher
        .save()
        .then(() => {
          return res.json({
            success: true,
            message: "New teacher profile added successfully.",
          });
        })
        .catch((err: any) => {
          console.log("Error: ", err);
          return next(
            new ErrorHandler("Error adding new teacher profile", 500)
          );
        });
    } catch (error) {
      console.error("Error in addNewTeacher:", error);
      return next(new ErrorHandler("Error adding new teacher", 500));
    }
  }
);
export const updateTeacher = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherId = req.params.id;
    if (!teacherId) {
      return next(new ErrorHandler("Teacher id is required", 400));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher && existingTeacher.id !== teacherId) {
      return next(
        new ErrorHandler("Teacher profile with this email already exists", 400)
      );
    }

    const updatedData = {
      ...req.body,
      email: req.body.email.toLowerCase(),
    };

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const cvFile = fileWithFields.cvFile ? fileWithFields.cvFile[0] : null;
    const aetCertificateFile = fileWithFields.aetCertificateFile
      ? fileWithFields.aetCertificateFile[0]
      : null;
    const cmCertificateFile = fileWithFields.cmCertificateFile
      ? fileWithFields.cmCertificateFile[0]
      : null;
    const lv3FirstAidCert = fileWithFields.lv3FirstAidCert
      ? fileWithFields.lv3FirstAidCert[0]
      : null;
    const cpdFile = fileWithFields.cpdFile ? fileWithFields.cpdFile[0] : null;
    const lv3PiCert = fileWithFields.lv3PiCert
      ? fileWithFields.lv3PiCert[0]
      : null;
    const piLicense = fileWithFields.piLicense
      ? fileWithFields.piLicense[0]
      : null;
    const otherDocument = fileWithFields.otherDocument
      ? fileWithFields.otherDocument[0]
      : null;

    if (!cvFile && !existingTeacher?.cvFile) {
      return next(new ErrorHandler("Updated CV is required", 400));
    }

    const validateFile = (file: Express.Multer.File | null) => {
      if (!file) {
        return;
      }

      const extension = getPdfDocImageExtension(file ? file.mimetype : "");
      if (!extension) {
        return next(new ErrorHandler("Unsupported file type", 400));
      }
    };

    validateFile(cvFile);
    validateFile(aetCertificateFile);
    validateFile(cmCertificateFile);
    validateFile(lv3FirstAidCert);
    validateFile(cpdFile);
    validateFile(lv3PiCert);
    validateFile(piLicense);
    validateFile(otherDocument);

    const authClient = await authorizeGoogleApi();

    // Helper function to convert buffer to stream
    const bufferToStream = (buffer: Buffer): Readable => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // End of stream
      return stream;
    };

    interface FileMetaData {
      id: string;
      mimeType: string;
    }

    // Helper function to upload file to Google Drive and get file ID
    const uploadToGoogleDrive = async (
      file: Express.Multer.File,
      folderId: string
    ): Promise<FileMetaData> => {
      const filePath = file.originalname; // Use the original file name for the uploaded files
      const mimeType = file.mimetype;
      const fileStream = bufferToStream(file?.buffer);

      try {
        // Upload to Google Drive
        const driveFile = await uploadPdfImageApi(
          authClient,
          fileStream,
          filePath,
          folderId,
          mimeType
        );
        if (!driveFile) {
          throw new Error("Error uploading file to Google Drive");
        }
        return {
          id: driveFile.id as string,
          mimeType: mimeType,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Error uploading file to Google Drive");
      }
    };

    try {
      const folderId = "1bwIdbJxfNF9Zw_l7386LkY-G26VpXF7X";

      type FileMetaData = {
        id: string;
        mimeType: string;
      };

      let cvFileMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let aetCertificateFileMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let cmCertificateMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let lv3FirstAidCertMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let cpdFileMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let lv3PiCertMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let piLicenseMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };
      let otherDocumentMetaData: FileMetaData = {
        id: "",
        mimeType: "",
      };

      if (cvFile) {
        cvFileMetaData = await uploadToGoogleDrive(cvFile, folderId);
      }

      if (aetCertificateFile) {
        aetCertificateFileMetaData = await uploadToGoogleDrive(
          aetCertificateFile,
          folderId
        );
      }

      if (cmCertificateFile) {
        cmCertificateMetaData = await uploadToGoogleDrive(
          cmCertificateFile,
          folderId
        );
      }

      if (lv3FirstAidCert) {
        lv3FirstAidCertMetaData = await uploadToGoogleDrive(
          lv3FirstAidCert,
          folderId
        );
      }
      if (cpdFile) {
        cpdFileMetaData = await uploadToGoogleDrive(cpdFile, folderId);
      }

      if (lv3PiCert) {
        lv3PiCertMetaData = await uploadToGoogleDrive(lv3PiCert, folderId);
      }
      if (piLicense) {
        piLicenseMetaData = await uploadToGoogleDrive(piLicense, folderId);
      }
      if (otherDocument) {
        otherDocumentMetaData = await uploadToGoogleDrive(
          otherDocument,
          folderId
        );
      }

      if (cvFileMetaData && cvFileMetaData.id) {
        updatedData.cvFile = cvFileMetaData.id;
        updatedData.cvFileMimeType = cvFileMetaData.mimeType;
      } else if (!cvFile && existingTeacher) {
        updatedData.cvFile = existingTeacher.cvFile;
        updatedData.cvFileMimeType = existingTeacher.cvFileMimeType;
      }

      if (aetCertificateFileMetaData && aetCertificateFileMetaData.id) {
        updatedData.aetCertificateFile = aetCertificateFileMetaData.id;
        updatedData.aetCertificateFileMimeType =
          aetCertificateFileMetaData.mimeType;
      } else if (!aetCertificateFile && existingTeacher) {
        updatedData.aetCertificateFile = existingTeacher.aetCertificateFile;
        updatedData.aetCertificateFileMimeType =
          existingTeacher.aetCertificateFileMimeType;
      }

      if (cmCertificateMetaData && cmCertificateMetaData.id) {
        updatedData.cmCertificateFile = cmCertificateMetaData.id;
        updatedData.cmCertificateFileMimeType = cmCertificateMetaData.mimeType;
      } else if (!cmCertificateFile && existingTeacher) {
        updatedData.cmCertificateFile = existingTeacher.cmCertificateFile;
        updatedData.cmCertificateFileMimeType =
          existingTeacher.cmCertificateFileMimeType;
      }

      if (lv3FirstAidCertMetaData && lv3FirstAidCertMetaData.id) {
        updatedData.lv3FirstAidCert = lv3FirstAidCertMetaData.id;
        updatedData.lv3FirstAidCertMimeType = lv3FirstAidCertMetaData.mimeType;
      } else if (!lv3FirstAidCert && existingTeacher) {
        updatedData.lv3FirstAidCert = existingTeacher.lv3FirstAidCert;
        updatedData.lv3FirstAidCertMimeType =
          existingTeacher.lv3FirstAidCertMimeType;
      }

      if (cpdFileMetaData && cpdFileMetaData.id) {
        updatedData.cpdFile = cpdFileMetaData.id;
        updatedData.cpdFileMimeType = cpdFileMetaData.mimeType;
      } else if (!cpdFile && existingTeacher) {
        updatedData.cpdFile = existingTeacher.cpdFile;
        updatedData.cpdFileMimeType = existingTeacher.cpdFileMimeType;
      }

      if (lv3PiCertMetaData && lv3PiCertMetaData.id) {
        updatedData.lv3PiCert = lv3PiCertMetaData.id;
        updatedData.lv3PiCertMimeType = lv3PiCertMetaData.mimeType;
      } else if (!lv3PiCert && existingTeacher) {
        updatedData.lv3PiCert = existingTeacher.lv3PiCert;
        updatedData.lv3PiCertMimeType = existingTeacher.lv3PiCertMimeType;
      }

      if (piLicenseMetaData && piLicenseMetaData.id) {
        updatedData.piLicense = piLicenseMetaData.id;
        updatedData.piLicenseMimeType = piLicenseMetaData.mimeType;
      } else if (!piLicense && existingTeacher) {
        updatedData.piLicense = existingTeacher.piLicense;
        updatedData.piLicenseMimeType = existingTeacher.piLicenseMimeType;
      }
      if (otherDocumentMetaData && otherDocumentMetaData.id) {
        updatedData.otherDocument = otherDocumentMetaData.id;
        updatedData.otherDocumentMimeType = otherDocumentMetaData.mimeType;
      } else if (!otherDocument && existingTeacher) {
        updatedData.otherDocument = existingTeacher.otherDocument;
        updatedData.otherDocumentMimeType =
          existingTeacher.otherDocumentMimeType;
      }

      const teacher = await Teacher.findByIdAndUpdate(teacherId, updatedData, {
        new: true,
      })
        .then((teacher) => {
          return res.json(teacher);
        })
        .catch((err) => {
          console.log("Error: ", err);
          return next(
            new ErrorHandler("Error while updating teacher profile", 500)
          );
        });
    } catch (error) {
      console.error("Error updating teacher profile:", error);
      return next(
        new ErrorHandler("Error while updating teacher profile", 500)
      );
    }
  }
);

export const getTeacherById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherId = req.params.id;
    if (!teacherId) {
      return next(new ErrorHandler("Teacher id is required", 400));
    }

    const teacher = await Teacher.findById(teacherId)
      .then((teacher) => {
        return res.json(teacher);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while getting teacher profile", 500)
        );
      });
  }
);
interface ITeacher extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  mobile: string;
  piLicenseExpiryDate: Date;
  siaLicenseExpiryDate: Date;
  aetCertificateDate: Date;
  cvFile?: string;
  aetCertificateFile?: string;
  cmCertificateFile?: string;
  cvFileInfo?: any; // Replace 'any' with the actual type of your file metadata
}

export const getAllTeachers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teachers = await Teacher.find().lean();

      return res.json({ teachers });
    } catch (err) {
      console.log("Error: ", err);
      return next(new ErrorHandler("Error while getting teachers", 500));
    }
  }
);

export const getTeachersFile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new ErrorHandler("File ID is required", 400));
      }

      const _id = new mongoose.Types.ObjectId(id);

      const file = await gfsBucket.find({ _id }).toArray();

      if (!file || file.length === 0) {
        return res.sendStatus(404);
      }

      const downloadStream = gfsBucket.openDownloadStream(_id);

      // Set the response headers
      res.setHeader("Content-Type", file[0]?.metadata?.contentType);
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + file[0].filename + '"'
      );

      downloadStream.on("data", (chunk) => {
        res.write(chunk);
      });

      downloadStream.on("error", () => {
        res.sendStatus(404);
      });

      downloadStream.on("end", () => {
        res.end();
      });
    } catch (error) {
      console.error("Error retrieving file:", error);
      return next(new ErrorHandler("Error", 500));
    }
  }
);

export const deleteTeacherById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherId = req.params.id;
    if (!teacherId) {
      return next(new ErrorHandler("Teacher id is required", 400));
    }

    // await Teacher.findByIdAndDelete(teacherId);
    // res.status(204).send();

    // const teacher = await Teacher.findById(teacherId);
    // if (!teacher) {
    //   return next(new ErrorHandler("Teacher profile not found", 404));
    // }

    // Find all files associated with the teacher
    // const files = await gfsBucket
    //   .find({
    //     "metadata.teacherId": new mongoose.Types.ObjectId(teacherId),
    //   })
    //   .toArray();

    // for (let file of files) {
    //   // Delete each file by its id
    //   await gfsBucket.delete(file._id);
    // }

    try {
      await Teacher.findByIdAndDelete(teacherId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting teacher profile:", error);
      return next(new ErrorHandler("Error deleting teacher profile", 500));
    }
  }
);

export const deleteManyTeacherProfiles = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherIds = req.body.teacherIds;
    console.log("teacherIds:", teacherIds);
    return;
    if (!teacherIds) {
      return next(new ErrorHandler("Teacher ids are required", 400));
    }

    await Teacher.deleteMany({ _id: { $in: teacherIds } })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while deleting teacher profiles", 500)
        );
      });
  }
);

export const searchTeacher = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
      const teachers = await Teacher.find({
        name: { $regex: new RegExp(name, "i") },
      })
        .select("_id name")
        .limit(5);

      res.json({
        success: true,
        data: teachers,
      });
    } catch (error) {
      return next(new ErrorHandler("Error searching for teacher", 500));
    }
  }
);

export const getTeachersList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const teachers = await Teacher.find()
      .select("_id name surname")
      .then((teachers) => {
        return res.json({ teachers });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting teachers", 500));
      });
  }
);

export const getInvigilatorList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const invigilators = await User.find({ role: "invigilator" })
      .select("_id firstName lastName")
      .then((invigilators) => {
        return res.json({ invigilators });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting invigilators", 500));
      });
  }
);

//! Course
export const addNewCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }
    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const ThumbnailFile = fileWithFields?.thumbnail[0];
    console.log(ThumbnailFile?.mimetype);
    const b64 = Buffer.from(ThumbnailFile?.buffer).toString("base64");
    let ThumbnailURI = `data:${ThumbnailFile?.mimetype};base64,${b64}`;
    const data = req.body.select("-thumbnail");
    const thumbnail = await uploadOnCloudinary(ThumbnailURI);
    console.log("thumbnail>>>>", thumbnail);

    const newCourse = new Course({
      ...data,
      thumbnail: thumbnail,
    });

    await newCourse
      .save()
      .then(() => {
        return res.json({
          success: true,
          message: "New course added successfully.",
        });
      })
      .catch((err: any) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while adding new course", 500));
      });
  }
);

export const updateCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course is required", 400));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    })
      .then((course) => {
        return res.json(course);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while updating course profile", 500)
        );
      });
  }
);
export const getCourseById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }

    const course = await Course.findById(courseId)
      .then((course) => {
        return res.json(course);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while getting course profile", 500)
        );
      });
  }
);
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.role === "iqa") {
      const courses = await Course.find({
        iqaAssigned: { $in: [userId] },
      })
        .populate("iqaAssigned", "_id firstName lastName")
        .populate("eqaAssigned", "_id firstName lastName")
        .then((courses) => {
          return res.json({ courses });
        })
        .catch((err) => {
          console.log("Error: ", err);
          return next(new ErrorHandler("Error while getting courses", 500));
        });
    } else if (user.role === "eqa") {
      const courses = await Course.find({
        eqaAssigned: { $in: [userId] },
      })
        .populate("iqaAssigned", "_id firstName lastName")
        .populate("eqaAssigned", "_id firstName lastName")
        .then((courses) => {
          return res.json({ courses });
        })
        .catch((err) => {
          console.log("Error: ", err);
          return next(new ErrorHandler("Error while getting courses", 500));
        });
    } else {
      const courses = await Course.find()
        .populate("iqaAssigned", "_id firstName lastName")
        .populate("eqaAssigned", "_id firstName lastName")
        .then((courses) => {
          return res.json({ courses });
        })
        .catch((err) => {
          console.log("Error: ", err);
          return next(new ErrorHandler("Error while getting courses", 500));
        });
    }
  }
);
export const deleteCourseById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    await course.deleteOne();
    res.status(204).send();
  }
);

export const deleteManyCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseIds = req.body.courseIds;
    console.log("courseIds:", courseIds);
    return;
    if (!courseIds) {
      return next(new ErrorHandler("course ids are required", 400));
    }

    await Course.deleteMany({ _id: { $in: courseIds } })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while deleting courses", 500));
      });
  }
);

export const getCoursesList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await Course.find({ isActive: true })
      .then((courses) => {
        return res.json({ courses });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting courses", 500));
      });
  }
);

export const getCoursesCount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const count = await Course.countDocuments()
      .then((count) => {
        return res.json({ count });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting total courses", 500));
      });
  }
);

export const uploadCourseDocuments = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const fileKeys = [
      "uploadNominal",
      "uploadAttendance",
      "uploadCid",
      "uploadOther",
    ];
    const filesToUpload: Express.Multer.File[] = [];

    for (const key of fileKeys) {
      const file = fileWithFields[key] ? fileWithFields[key][0] : null;
      if (file) {
        const extension = getPdfDocImageExtension(file.mimetype);
        if (!extension) {
          return next(new ErrorHandler("Unsupported file type", 400));
        } else {
          filesToUpload.push(file);
        }
      }
    }

    if (filesToUpload.length === 0) {
      return next(new ErrorHandler("No valid file provided", 400));
    }

    const authClient = await authorizeGoogleApi();

    const bufferToStream = (buffer: Buffer): Readable => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // End of stream
      return stream;
    };

    interface FileMetaData {
      id: string;
      mimeType: string;
    }

    const folderId = "1Wojm6z5JsMz9Z2PoXs7nAAesglA358YF";
    let updatedData: any = {};

    const uploadToGoogleDrive = async (
      file: Express.Multer.File,
      folderId: string
    ): Promise<FileMetaData> => {
      const filePath = file.originalname; // Use the original file name for the uploaded files
      const mimeType = file.mimetype;
      const fileStream = bufferToStream(file?.buffer);

      try {
        // Upload to Google Drive
        const driveFile = await uploadPdfImageApi(
          authClient,
          fileStream,
          filePath,
          folderId,
          mimeType
        );
        if (!driveFile) {
          throw new Error("Error uploading file to Google Drive");
        }
        return {
          id: driveFile.id as string,
          mimeType: mimeType,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Error uploading file to Google Drive");
      }
    };

    try {
      for (const file of filesToUpload) {
        const metaData = await uploadToGoogleDrive(file, folderId);
        updatedData[`${file.fieldname}`] = metaData.id;
        updatedData[`${file.fieldname}MimeType`] = metaData.mimeType;
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Document uploaded",
      });
    } catch (error) {
      console.error("Error in upload course documents:", error);
      return next(new ErrorHandler("Error uploading document", 500));
    }
  }
);

function generateUniqueRegistrationId(previousRegistrationId: string): string {
  const previousIdNumber = parseInt(previousRegistrationId, 10);
  const incrementValue = 2;
  const newIdNumber = previousIdNumber + incrementValue;

  return newIdNumber.toString();
}
//
let gfsBucketStudent: mongoose.mongo.GridFSBucket;

const connStudent = mongoose.connection;
connStudent.once("open", () => {
  gfsBucketStudent = new mongoose.mongo.GridFSBucket(connStudent.db, {
    bucketName: "studentfiles", // collection name
  });
});

export const addNewStudent = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }
    if (!req.body.courseId || !req.body.timeSlotId) {
      return next(new ErrorHandler("Course and Time Slot are required", 400));
    }

    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    const timeSlot = course.timeSlots.id(req.body.timeSlotId);
    if (!timeSlot) {
      return next(new ErrorHandler("Time Slot not found", 404));
    }

    if (timeSlot.studentsCapacity <= timeSlot.numberOfStudents) {
      return next(new ErrorHandler("Time Slot is full", 400));
    }
    if (!req.body.email) {
      return next(new ErrorHandler("Email is required", 400));
    }
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return next(
        new ErrorHandler("Student with this email already exists", 400)
      );
    }
    const lastStudent = await Student.findOne({})
      .sort({ registrationId: -1 })
      .collation({ locale: "en_US", numericOrdering: true });

    let newRegistrationId = "1";
    if (lastStudent && lastStudent.registrationId) {
      const lastIdNumber = parseInt(lastStudent.registrationId, 10);
      newRegistrationId = (lastIdNumber + 1).toString();
    }

    const uniqueUrl = uuidv4();

    const newStudent = new Student({
      ...req.body,
      email: req.body.email.toLowerCase(),
      timeSlot: {
        slotId: timeSlot._id,
        slotName: timeSlot.slotName,
      },
      uniqueUrl,
      registrationId: newRegistrationId,
      agentId: req.body.agentId || null,
      fee: parseFloat(req.body.fee) || 0,
      deposit: parseFloat(req.body.deposit) || 0,
      cash: parseFloat(req.body.cash) || 0,
      bank: parseFloat(req.body.bank) || 0,
      remainingFee: parseFloat(req.body.remainingFee) || 0,
      addedByAdmin: true,
      isSubmitted: true,
    });

    // Handle file uploads
    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const uploadPromises = [
      // Handle certificate upload
      new Promise<string>((resolve, reject) => {
        if (fileWithFields.certificate && fileWithFields.certificate[0]) {
          const certificate = fileWithFields.certificate[0];
          const extension = getFileExtension(certificate.mimetype);
          const uploadStream = gfsBucketStudent.openUploadStream(
            `cert-${newStudent._id}${extension}`,
            {
              metadata: {
                contentType: certificate.mimetype,
                studentId: newStudent._id,
              },
            }
          );
          uploadStream.end(certificate?.buffer);
          uploadStream.on("finish", () => resolve(uploadStream.id.toString()));
          uploadStream.on("error", reject);
        } else {
          resolve("");
        }
      }),
      // Handle ID images upload
      ...["id1Image", "id2Image", "id3Image"].map(
        (fieldName) =>
          new Promise<string>((resolve, reject) => {
            if (fileWithFields[fieldName]) {
              const image = fileWithFields[fieldName][0];
              const extension = getFileExtension(image.mimetype);
              const uploadStream = gfsBucketStudent.openUploadStream(
                `${fieldName}-${newStudent._id}${extension}`,
                {
                  metadata: {
                    contentType: image.mimetype,
                    studentId: newStudent._id,
                  },
                }
              );
              uploadStream.end(image?.buffer);
              uploadStream.on("finish", () =>
                resolve(uploadStream.id.toString())
              );
              uploadStream.on("error", reject);
            } else {
              resolve("");
            }
          })
      ),
    ];

    // Utility function to determine file extension based on MIME type
    function getFileExtension(mimetype: string): string {
      switch (mimetype) {
        case "application/pdf":
          return ".pdf";
        case "application/msword":
          return ".doc";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return ".docx";
        case "image/jpeg":
        case "image/pjpeg":
          return ".jpg";
        case "image/png":
          return ".png";
        default:
          throw new Error("Unsupported file type");
      }
    }

    const data = studentAddEmail;
    // Handle uploads and save student
    Promise.all(uploadPromises)
      .then(([certificate, id1FileId, id2FileId, id3FileId]) => {
        newStudent.certificate = certificate;
        newStudent.id1Image = id1FileId;
        newStudent.id2Image = id2FileId;
        newStudent.id3Image = id3FileId;

        return newStudent.save().then(() => {
          // Update time slot and course
          timeSlot.numberOfStudents += 1;
          return course.save();
        });
      })

      .then(() => {
        // Send confirmation email
        mg.messages
          .create(process.env.MAILGUN_DOMAIN_NAME as string, data(newStudent))
          .then(() =>
            res.json({
              success: true,
              message: "New student added successfully.",
            })
          )
          .catch((error) => {
            console.log("Error In Mailgun:", error);
            return next(
              new ErrorHandler("Student registered but email was not sent", 403)
            );
          });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error adding new student", 500));
      });
  }
);

export const updateStudent = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    if (!req.body.email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    if (!req.body.courseId) {
      return next(new ErrorHandler("Course is required", 400));
    }

    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const existingStudent = await Student.findOne({ email: req.body.email });
    if (!existingStudent) {
      return next(
        new ErrorHandler("Student profile with this email does not exist", 400)
      );
    }

    // if (existingStudent.id !== studentId) {
    //   return next(
    //     new ErrorHandler("Student profile with this email already exists", 400)
    //   );
    // }

    // if (existingStudent.courseId !== req.body.courseId) {
    //   return next(
    //     new ErrorHandler("Cannot change course", 400)
    //   );
    // }
    // if (existingStudent.timeSlotId !== req.body.timeSlotId) {
    //   return next(
    //     new ErrorHandler("Cannot change time slot", 400)
    //   );
    // }
    const updatedData = {
      ...req.body,
      email: req.body.email.toLowerCase(),
      agentId:
        req.body.agentId && req.body.agentId !== "" ? req.body.agentId : null,
      fee: req.body.fee ? parseFloat(req.body.fee) : 0,
      deposit: req.body.deposit ? parseFloat(req.body.deposit) : 0,
      cash:
        req.body.cash && !isNaN(req.body.cash) ? parseFloat(req.body.cash) : 0,
      bank: req.body.bank ? parseFloat(req.body.bank) : 0,
      remainingFee: req.body.remainingFee
        ? parseFloat(req.body.remainingFee)
        : 0,
    };

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (
      fileWithFields.avatar &&
      fileWithFields.avatar[0].size > 10 * 1024 * 1024
    ) {
      return next(
        new ErrorHandler("Picture size cannot be more than 10 mb", 400)
      );
    }

    if (
      fileWithFields.certificate &&
      fileWithFields.certificate[0].size > 10 * 1024 * 1024
    ) {
      return next(
        new ErrorHandler("Certificate size cannot be more than 10 mb", 400)
      );
    }

    if (
      fileWithFields.id1Image &&
      fileWithFields.id1Image[0].size > 10 * 1024 * 1024
    ) {
      return next(new ErrorHandler("ID 1 size cannot be more than 10 mb", 400));
    }
    if (
      fileWithFields.id2Image &&
      fileWithFields.id2Image[0].size > 10 * 1024 * 1024
    ) {
      return next(new ErrorHandler("ID 2 size cannot be more than 10 mb", 400));
    }

    if (
      fileWithFields.id3Image &&
      fileWithFields.id3Image[0].size > 10 * 1024 * 1024
    ) {
      return next(new ErrorHandler("ID 3 size cannot be more than 10 mb", 400));
    }

    const base64Avatar = fileWithFields.avatar
      ? Buffer.from(fileWithFields.avatar[0]?.buffer).toString("base64")
      : null;

    // if (base64Avatar) {
    updatedData.avatar = base64Avatar;
    // }

    const certificate = fileWithFields.certificate
      ? fileWithFields.certificate[0]
      : null;
    const id1Image = fileWithFields.id1Image
      ? fileWithFields.id1Image[0]
      : null;
    const id2Image = fileWithFields.id2Image
      ? fileWithFields.id2Image[0]
      : null;
    const id3Image = fileWithFields.id3Image
      ? fileWithFields.id3Image[0]
      : null;

    let extensionCertificate: string;
    if (certificate) {
      updatedData.certificate = certificate;
      switch (certificate?.mimetype) {
        case "application/pdf":
          extensionCertificate = ".pdf";
          break;
        case "application/msword":
          extensionCertificate = ".doc";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extensionCertificate = ".docx";
          break;
        case "image/jpeg":
        case "image/pjpeg":
          extensionCertificate = ".jpg";
          break;
        case "image/png":
          extensionCertificate = ".png";
          break;
        default:
          return next(new ErrorHandler("Unsupported file type", 400));
      }
    }

    let extensionId1Image: string;
    if (id1Image) {
      updatedData.id1Image = id1Image;
      switch (id1Image?.mimetype) {
        case "application/pdf":
          extensionId1Image = ".pdf";
          break;
        case "application/msword":
          extensionId1Image = ".doc";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extensionId1Image = ".docx";
          break;
        case "image/jpeg":
        case "image/pjpeg":
          extensionId1Image = ".jpg";
          break;
        case "image/png":
          extensionId1Image = ".png";
          break;
        default:
          return next(new ErrorHandler("Unsupported file type", 400));
      }
    }

    let extensionId2Image: string;
    if (id2Image) {
      updatedData.id2Image = id2Image;
      switch (id2Image?.mimetype) {
        case "application/pdf":
          extensionId2Image = ".pdf";
          break;
        case "application/msword":
          extensionId2Image = ".doc";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extensionId2Image = ".docx";
          break;
        case "image/jpeg":
        case "image/pjpeg":
          extensionId2Image = ".jpg";
          break;
        case "image/png":
          extensionId2Image = ".png";
          break;
        default:
          return next(new ErrorHandler("Unsupported file type", 400));
      }
    }

    let extensionId3Image: string;
    if (id3Image) {
      updatedData.id3Image = id3Image;
      switch (id3Image?.mimetype) {
        case "application/pdf":
          extensionId3Image = ".pdf";
          break;
        case "application/msword":
          extensionId3Image = ".doc";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extensionId3Image = ".docx";
          break;
        case "image/jpeg":
        case "image/pjpeg":
          extensionId3Image = ".jpg";
          break;
        case "image/png":
          extensionId3Image = ".png";
          break;
        default:
          return next(new ErrorHandler("Unsupported file type", 400));
      }
    }

    const uploadPromises = [
      new Promise<string>((resolve, reject) => {
        if (certificate) {
          const certificateUploadStream = gfsBucketStudent.openUploadStream(
            `cert-${existingStudent._id}${extensionCertificate}`,
            {
              metadata: {
                contentType: certificate?.mimetype,
                studentId: existingStudent._id,
              },
            }
          );
          certificateUploadStream.end(certificate?.buffer);
          certificateUploadStream.on("finish", () => {
            resolve(certificateUploadStream.id.toString());
          });
          certificateUploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve(existingStudent?.certificate || "");
        }
      }),

      new Promise<string>((resolve, reject) => {
        if (id1Image) {
          const id1ImageUploadStream = gfsBucketStudent.openUploadStream(
            `id1-${existingStudent._id}${extensionId1Image}`,
            {
              metadata: {
                contentType: id1Image?.mimetype,
                studentId: existingStudent._id,
              },
            }
          );
          id1ImageUploadStream.end(id1Image?.buffer);
          id1ImageUploadStream.on("finish", () => {
            resolve(id1ImageUploadStream.id.toString());
          });
          id1ImageUploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve(existingStudent?.id1Image || "");
        }
      }),

      new Promise<string>((resolve, reject) => {
        if (id2Image) {
          const id2ImageUploadStream = gfsBucketStudent.openUploadStream(
            `id2-${existingStudent._id}${extensionId2Image}`,
            {
              metadata: {
                contentType: id2Image?.mimetype,
                studentId: existingStudent._id,
              },
            }
          );
          id2ImageUploadStream.end(id2Image?.buffer);
          id2ImageUploadStream.on("finish", () => {
            resolve(id2ImageUploadStream.id.toString());
          });
          id2ImageUploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve(existingStudent?.id2Image || "");
        }
      }),
      new Promise<string>((resolve, reject) => {
        if (id3Image) {
          const id3ImageUploadStream = gfsBucketStudent.openUploadStream(
            `id2-${existingStudent._id}${extensionId3Image}`,
            {
              metadata: {
                contentType: id3Image?.mimetype,
                studentId: existingStudent._id,
              },
            }
          );
          id3ImageUploadStream.end(id3Image?.buffer);
          id3ImageUploadStream.on("finish", () => {
            resolve(id3ImageUploadStream.id.toString());
          });
          id3ImageUploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve(existingStudent?.id3Image || "");
        }
      }),
    ];

    Promise.all(uploadPromises)
      .then(async ([certificate, id1FileId, id2FileId, id3FileId]) => {
        updatedData.certificate = certificate;
        updatedData.id1Image = id1FileId;
        updatedData.id2Image = id2FileId;
        updatedData.id3Image = id3FileId;

        const student = await Student.findByIdAndUpdate(
          studentId,
          updatedData,
          {
            new: true,
          }
        )
          .then(() => {
            return res.json({
              success: true,
              message: "Student profile updated successfully.",
            });
          })
          .catch((err: any) => {
            console.log("Error: ", err);
            return next(
              new ErrorHandler("Error while updating student profile", 500)
            );
          });
      })
      .catch((err) => {
        console.log("Error:", err);
        return next(new ErrorHandler("Error saving file", 500));
      });
  }
);

export const getStudentById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    try {
      const student = await Student.findById(studentId).populate(
        "courseId",
        "acmScheduleId apiScheduleId pwdsScheduleId wipsiScheduleId"
      );
      return res.json(student);
    } catch (err) {
      console.log("Error: ", err);
      return next(new ErrorHandler("Error while getting student profile", 500));
    }
  }
);

interface IStudent extends mongoose.Document {
  certificate?: string | null | undefined;
  id1Image?: string | null | undefined;
  id2Image?: string | null | undefined;
  id3Image?: string | null | undefined;
  certificateFileInfo?: any;
  id1ImageFileInfo?: any;
  id2ImageFileInfo?: any;
  id3ImageFileInfo?: any;
}

export const getAllStudents = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    try {
      let students: IStudent[];
      if (user.role === "eqa") {
        students = await Student.find({
          isSubmitted: true,
          eqaAssigned: { $in: [userId] },
        })
          .select(
            "-avatar -disabilityStatus -agentName -agentSurname -fee -deposit -cash -bank -remainingFee"
          )
          .populate("eqaAssigned", "_id firstName lastName")
          .sort({ _id: -1 })
          .lean();
      } else if (user.role === "iqa") {
        const assignedCourses = await Course.find({
          iqaAssigned: { $in: [userId] },
        }).lean();
        const courseIds = assignedCourses.map((course) => course._id);
        students = await Student.find({
          isSubmitted: true,
          courseId: { $in: courseIds },
        })
          .select(
            "-avatar -disabilityStatus -agentName -agentSurname -fee -deposit -cash -bank -remainingFee"
          )
          .populate("eqaAssigned", "_id firstName lastName")
          .sort({ _id: -1 })
          .lean();
      } else if (
        user.role === "hoc" ||
        user.role === "admin" ||
        user.role === "invigilator" ||
        user.role === "teacher"
      ) {
        students = await Student.find({ isSubmitted: true })
          .select(
            "-avatar -disabilityStatus -agentName -agentSurname -fee -deposit -cash -bank -remainingFee"
          )
          .populate("eqaAssigned", "_id firstName lastName")
          .sort({ _id: -1 })
          .lean();
      } else {
        students = [];
      }
      // const students: IStudent[] = await Student.find({ isSubmitted: true })
      // .select(
      //   "-avatar -disabilityStatus -agentName -agentSurname -fee -deposit -cash -bank -remainingFee"
      // )
      // .populate("eqaAssigned", "_id firstName lastName")
      // .lean();

      const fileIds: mongoose.Types.ObjectId[] = [];

      const validatedStudents = students.map((student) => {
        const validatedStudent: Partial<IStudent> = { ...student };
        ["certificate", "id1Image", "id2Image", "id3Image"].forEach((field) => {
          const fieldValue = student[field as keyof IStudent];
          if (
            fieldValue &&
            typeof fieldValue === "string" &&
            mongoose.Types.ObjectId.isValid(fieldValue)
          ) {
            fileIds.push(new mongoose.Types.ObjectId(fieldValue));
          } else {
            validatedStudent[field as keyof IStudent] = undefined;
          }
        });
        return validatedStudent;
      });

      return res.json({ students: validatedStudents });
    } catch (err) {
      console.log("Error: ", err);
      return next(new ErrorHandler("Error while getting students", 500));
    }
  }
);

export const getStudentsFile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

      if (!id) {
        return next(new ErrorHandler("File ID is required", 400));
      }

      if (!isValidObjectId) {
        return next(new ErrorHandler("Invalid file ID", 400));
      }

      const _id = new mongoose.Types.ObjectId(id);

      const file = await gfsBucketStudent.find({ _id }).toArray();

      if (!file || file.length === 0) {
        return res.sendStatus(404);
      }

      const downloadStream = gfsBucketStudent.openDownloadStream(_id);

      // Set the response headers
      res.setHeader("Content-Type", file[0]?.metadata?.contentType);
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + file[0].filename + '"'
      );

      downloadStream.on("data", (chunk) => {
        res.write(chunk);
      });

      downloadStream.on("error", () => {
        res.sendStatus(404);
      });

      downloadStream.on("end", () => {
        res.end();
      });
    } catch (error) {
      console.error("Error retrieving file:", error);
      return next(new ErrorHandler("Error", 500));
    }
  }
);

export const deleteStudentById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("Student profile not found", 404));
    }
    const course = await Course.findById(student.courseId);

    // Find all files associated with the student
    const files = await gfsBucketStudent
      .find({
        "metadata.studentId": new mongoose.Types.ObjectId(studentId),
      })
      .toArray();

    for (let file of files) {
      // Delete each file by its id
      await gfsBucketStudent.delete(file._id);
    }

    await student
      .deleteOne()
      .then(async () => {
        if (course) {
          // Optionally, update specific time slot capacity if student is linked to a time slot
          const timeSlotId = student.timeSlotId; // Assuming student has a field timeSlotId
          if (timeSlotId) {
            const timeSlot = course.timeSlots.id(timeSlotId);
            if (timeSlot) {
              timeSlot.numberOfStudents = timeSlot.numberOfStudents - 1;
            }
          }
          await course
            .save()
            .then(() => {
              return res.json({
                success: true,
                message: "Student profile deleted successfully.",
              });
            })
            .catch((err: any) => {
              console.log("Error: ", err);
              return next(
                new ErrorHandler(
                  "Error while decrementing number of students",
                  500
                )
              );
            });
        } else {
          return res.json({
            success: true,
            message: "Student profile deleted successfully.",
          });
        }
      })
      .catch((err: any) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while deleting student profile", 500)
        );
      });
  }
);

export const deleteManyStudents = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentIds = req.body.studentIds;
    console.log("studentIds:", studentIds);
    return;
    if (!studentIds) {
      return next(new ErrorHandler("Student ids are required", 400));
    }

    await Student.deleteMany({ _id: { $in: studentIds } })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while deleting student profiles", 500)
        );
      });
  }
);

export const getStudentsCount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const count = await Student.countDocuments({ isSubmitted: true })
      .then((count) => {
        return res.json({ count });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while getting students count", 500)
        );
      });
  }
);
export const getAllStudentsByCourseId = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    try {
      const students = await Student.find({ courseId: courseId }).select(
        "_id courseVenue courseTitle firstName surname email mobile title dob gender id1Type id2Type id3Type id1Code id2Code id3Code acmStatus apiStatus pwdsStatus wipsiStatus"
      );
      return res.json({ students });
    } catch (err) {
      console.log("Error: ", err);
      return next(new ErrorHandler("Error while getting students", 500));
    }
  }
);

export const getAllStudentsByCourseIdOnlyActive = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const students = await Student.find({
      $and: [{ courseId }, { isSubmitted: true }, { isActive: true }],
    })
      .select(
        "_id courseVenue courseTitle firstName surname email mobile title dob gender id1Type id2Type id3Type id1Code id2Code id3Code"
      )
      .then((students) => {
        return res.json({ students });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting students", 500));
      });
  }
);

export const getAllStudentsByAgentId = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.id;
    if (!agentId) {
      return next(new ErrorHandler("Agent id is required", 400));
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return next(new ErrorHandler("Agent not found", 404));
    }

    const students = await Student.find({
      $and: [{ agentId }, { isSubmitted: true }],
    })
      .select(
        "_id courseVenue courseTitle firstName surname email mobile gender agentName agentSurname fee deposit cash bank remainingFee"
      )
      .then((students) => {
        return res.json({ students });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting students", 500));
      });
  }
);

export const getAllStudentsByCourseIdForFee = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const students = await Student.find({ courseId, isSubmitted: true })
      .select(
        "_id courseVenue courseTitle firstName surname address email mobile title dob gender isActive agentName agentSurname fee deposit cash bank remainingFee"
      )
      .then((students) => {
        return res.json({ students });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting students", 500));
      });
  }
);

export const getFailedStudentsByCourseId = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) {
      return next(new ErrorHandler("Course id is required", 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    try {
      const students = await Student.find({
        courseId: courseId,
        $or: [
          { acmStatus: "fail" },
          { apiStatus: "fail" },
          { pwdsStatus: "fail" },
          { wipsiStatus: "fail" },
        ],
      })
        .select(
          "_id courseVenue courseTitle firstName surname mobile email title dob gender id1Type id2Type id3Type id1Code id2Code id3Code acmStatus apiStatus pwdsStatus wipsiStatus nextExamDate"
        )
        .populate(
          "courseId",
          "_id courseName courseStartDate courseEndDate acmScheduleId apiScheduleId pwdsScheduleId wipsiScheduleId"
        );
      return res.json({ students });
    } catch (err) {
      console.log("Error: ", err);
      return next(new ErrorHandler("Error while getting students", 500));
    }
  }
);
//

export const toggleStudentProfile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    const updatedData = {
      ...req.body,
    };

    const student = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true,
    })
      .then((s) => {
        return res.json({
          success: true,
          message: `${s?.isActive ? "Activated" : "Deactivated"} successfully`,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error", 500));
      });
  }
);

export const assignStudentToEQA = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    const { eqaId } = req.body;

    if (!eqaId || eqaId.trim() === "") {
      try {
        const student = await Student.findByIdAndUpdate(
          studentId,
          { $set: { eqaAssigned: [] } },
          { new: true }
        );
        return res
          .status(200)
          .json({ success: true, message: "Student unassigned" });
      } catch (error) {
        console.log("Error: ", error);
        return next(new ErrorHandler("Error while unassigning student", 500));
      }
    }

    try {
      const user = await User.findById(eqaId);
      if (!user || user.role !== "eqa") {
        return next(new ErrorHandler("Invalid user or role", 400));
      }

      const student = await Student.findByIdAndUpdate(
        studentId,
        { eqaAssigned: [eqaId] },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Student assigned to EQA" });
    } catch (error) {
      console.log("Error: ", error);
      return next(new ErrorHandler("Error while assigning student", 500));
    }
  }
);

export const studentPassFail = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student ID is required", 400));
    }

    try {
      const { acmStatus, apiStatus, pwdsStatus, wipsiStatus, nextExamDate } =
        req.body;

      // Find the student by their ID and update their status
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
          $set: { acmStatus, apiStatus, pwdsStatus, wipsiStatus, nextExamDate },
        },
        { new: true }
      );

      if (updatedStudent) {
        res.json({ success: true, message: "Result updated" });
      } else {
        res.status(404).json({ success: false, message: "Student not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "An error occurred", error });
    }
  }
);
//

const checkVideoSize = async (filePath: PathLike) => {
  const stats = statSync(filePath);
  const fileSizeInBytes = stats.size;
  console.log(`Video file size: ${fileSizeInBytes} bytes`);
  return fileSizeInBytes;
};

//
export const uploadScannedDocument = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("No document provided", 400));
    }

    const fileBuffer = req.file?.buffer;
    const tempFilePath = path.join(tmpdir(), req.file.originalname);

    writeFileSync(tempFilePath, fileBuffer);

    try {
      const authClient = await authorizeGoogleApi();
      const folderId = "1LZG8PhhoHhV-KZAc6TtjYS1TJG_YE4nk";

      const fileResponse = await uploadDocumentApi(
        authClient,
        tempFilePath,
        folderId
      );
      const fileId = fileResponse.id;

      const updatedData = { document: fileId };

      unlinkSync(tempFilePath);
      console.log("File deleted");

      await Student.findByIdAndUpdate(studentId, updatedData, { new: true });

      return res.status(200).json({
        success: true,
        message: "Document uploaded",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      if (existsSync(tempFilePath)) {
        unlinkSync(tempFilePath);
      }
      return next(new ErrorHandler("Error uploading document", 500));
    }
  }
);

export const uploadOtherDocument = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const fileKeys = [
      "other1",
      "other2",
      "other3",
      "document",
      "uploadedNominal",
      "uploadedAttendance",
    ];
    const filesToUpload: Express.Multer.File[] = [];

    for (const key of fileKeys) {
      const file = fileWithFields[key] ? fileWithFields[key][0] : null;
      if (file) {
        const extension = getPdfDocImageExtension(file.mimetype);
        if (!extension) {
          return next(new ErrorHandler("Unsupported file type", 400));
        } else {
          filesToUpload.push(file);
        }
      }
    }

    if (filesToUpload.length === 0) {
      return next(new ErrorHandler("No valid file provided", 400));
    }

    const authClient = await authorizeGoogleApi();

    const bufferToStream = (buffer: Buffer): Readable => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // End of stream
      return stream;
    };

    interface FileMetaData {
      id: string;
      mimeType: string;
    }

    const folderId = "1LZG8PhhoHhV-KZAc6TtjYS1TJG_YE4nk";
    let updatedData: any = {};

    const uploadToGoogleDrive = async (
      file: Express.Multer.File,
      folderId: string
    ): Promise<FileMetaData> => {
      const filePath = file.originalname; // Use the original file name for the uploaded files
      const mimeType = file.mimetype;
      const fileStream = bufferToStream(file?.buffer);

      try {
        // Upload to Google Drive
        const driveFile = await uploadPdfImageApi(
          authClient,
          fileStream,
          filePath,
          folderId,
          mimeType
        );
        if (!driveFile) {
          throw new Error("Error uploading file to Google Drive");
        }
        return {
          id: driveFile.id as string,
          mimeType: mimeType,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Error uploading file to Google Drive");
      }
    };

    try {
      for (const file of filesToUpload) {
        const metaData = await uploadToGoogleDrive(file, folderId);
        updatedData[`${file.fieldname}`] = metaData.id;
        updatedData[`${file.fieldname}MimeType`] = metaData.mimeType;
      }

      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Document uploaded",
      });
    } catch (error) {
      console.error("Error in uploadOtherDocument:", error);
      return next(new ErrorHandler("Error uploading document", 500));
    }
  }
);

//
export const uploadVideo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!fileWithFields) {
      return next(new ErrorHandler("No video file provided", 400));
    }

    const videoTypes = [
      "englishAssessmentVideo",
      "firstAidVideo1",
      "firstAidVideo2",
      "searchingQAVideo",
      "searchingProcedureVideo",
      "cMQAVideo",
      "cMDemoVideo",
      "physicalInterventionVideo",
      "piVideo1",
      "piVideo2",
      "piVideo3",
      "piVideo4",
      "piVideo5",
      "piVideo6",
      "piVideo7",
      "piVideo8",
      "piVideo9",
      "piVideo10",
      "piVideo11",
      "piVideo12",
      "piVideo13",
    ];

    const videoFileFieldName = videoTypes.find((type) => fileWithFields[type]);

    if (!videoFileFieldName) {
      return next(new ErrorHandler("No valid video file provided", 400));
    }

    const videoFile = videoFileFieldName
      ? fileWithFields[videoFileFieldName][0]
      : null;

    if (!videoFile) {
      return next(new ErrorHandler("No valid video file provided", 400));
    }

    const fileBuffer = videoFile?.buffer;
    const tempFilePath = path.join(tmpdir(), videoFile.originalname);

    // Write the buffer to a temporary file
    writeFileSync(tempFilePath, fileBuffer);

    try {
      const authClient = await authorizeGoogleApi();

      const fileResponse = await uploadFileApi(
        authClient,
        tempFilePath,
        "16YTpTJ1xRfIzmoRK3oJCDPwhe9PwQAh2"
      );
      const fileId = fileResponse.id;

      // const videoUrl = `https://drive.google.com/uc?id=${fileId}`;
      const videoUrl = fileId;

      const studentId = req.params.id;

      const updatedData = { [videoFileFieldName]: videoUrl };

      unlinkSync(tempFilePath);
      console.log("File deleted");

      await Student.findByIdAndUpdate(studentId, updatedData, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: "Video uploaded",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      if (existsSync(tempFilePath)) {
        unlinkSync(tempFilePath);
      }
      return next(new ErrorHandler("Error uploading file", 500));
    }
  }
);

export const uploadVideos = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    if (!studentId) {
      return next(new ErrorHandler("Student id is required", 400));
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("Student not found", 404));
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return next(new ErrorHandler("No video file provided", 400));
    }
    const drive = google.drive({ version: "v3" });

    try {
      const authClient = await authorizeGoogleApi();
      const userFolderId = await getOrCreateUserFolder(
        authClient,
        student.firstName + " " + student.surname
      );
      const folderLink = await shareFolderAndGetLink(authClient, userFolderId);

      // Loop through each file and upload it to the user's folder
      for (const file of files) {
        const fileMetadata = {
          name: file.originalname,
          parents: [userFolderId],
        };

        const media = {
          mimeType: file.mimetype,
          body: file?.buffer,
        };

        // const uploadResponse = await drive.files.create({
        await drive.files.create({
          auth: authClient,
          requestBody: fileMetadata,
          media: media,
          fields: "id",
        });

        // const fileId = uploadResponse.data.id;
        // const videoUrl = `https://drive.google.com/uc?id=${fileId}`;

        // Update the student record with the video URL
        // const updatedData = { [file.fieldname]: videoUrl };

        // Update the student record with the folder's shareable link instead of individual video URLs
        const updatedData = { folderLink: folderLink };
        await Student.findByIdAndUpdate(studentId, updatedData, {
          new: true,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Videos uploaded",
      });
    } catch (error) {
      console.error("Error uploading videos:", error);
      return next(new ErrorHandler("Error uploading videos", 500));
    }
  }
);

// accounts

export const addNewAccount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
      return next(new ErrorHandler("Email is required", 400));
    }
    if (!req.body.password) {
      return next(new ErrorHandler("Password is required", 400));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const account = await User.findOne({ email: req.body.email });
    if (account) {
      return next(
        new ErrorHandler("Account with this email already exists", 400)
      );
    }

    const account2 = await User.findOne({ username: req.body.username });
    if (account2) {
      return next(
        new ErrorHandler("Account with this username already exists", 400)
      );
    }

    const hashedPassword = await hash(req.body.password, 10);

    const newAccount = new User({
      ...req.body,
      password: hashedPassword,
    });

    const base64Image = req.file?.buffer.toString("base64");

    if (base64Image) {
      newAccount.avatar = base64Image;
    }

    await newAccount
      .save()
      .then(() => {
        return res.json({
          success: true,
          message: "New account added successfully.",
        });
      })
      .catch((err: any) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while adding new account", 500));
      });
  }
);

export const updateAccount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.params.id;
    if (!accountId) {
      return next(new ErrorHandler("Account id is required", 400));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const account1 = await User.findOne({ email: req.body.email });
    if (account1 && account1.id !== accountId) {
      return next(
        new ErrorHandler("Account with this email already exists", 400)
      );
    }

    const account2 = await User.findOne({ username: req.body.username });
    if (account2 && account2.id !== accountId) {
      return next(
        new ErrorHandler("Account with this username already exists", 400)
      );
    }

    let updatedData: any = {};
    let hashedPassword = null;

    if (req.body.password && req.body.password.length > 0) {
      hashedPassword = await hash(req.body.password, 10);
    }

    if (hashedPassword && hashedPassword.length > 0) {
      updatedData = {
        ...req.body,
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
      };
    } else {
      updatedData = {
        ...req.body,
        email: req.body.email.toLowerCase(),
        password: account1?.password,
      };
    }

    const base64Image = req.file?.buffer.toString("base64");

    if (base64Image) {
      updatedData.avatar = base64Image;
    }

    const account = await User.findByIdAndUpdate(accountId, updatedData, {
      new: true,
    })
      .then(() => {
        return res.json({
          success: true,
          message: "Account updated successfully.",
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while updating account profile", 500)
        );
      });
  }
);

export const getAccountById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.params.id;
    if (!accountId) {
      return next(new ErrorHandler("Account id is required", 400));
    }

    const account = await User.findById(accountId)
      .then((account) => {
        return res.json(account);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while getting account profile", 500)
        );
      });
  }
);

export const getAllAccounts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accounts = await User.find()
      .select("-password -avatar")
      .then((accounts) => {
        return res.json({ accounts });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting accounts", 500));
      });
  }
);

export const deleteAccountById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.params.id;
    if (!accountId) {
      return next(new ErrorHandler("Account id is required", 400));
    }

    const account = await User.findById(accountId);
    if (!account) {
      return next(new ErrorHandler("Account not found", 404));
    }
    try {
      await account.deleteOne();
      return res.status(204).json({
        success: true,
        message: "Account deleted successfully.",
      });
    } catch (error) {
      return next(new ErrorHandler("Error while deleting account", 500));
    }
  }
);

export const deleteManyAccounts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accountIds = req.body.accountIds;
    console.log("accountIds:", accountIds);
    return;
    if (!accountIds) {
      return next(new ErrorHandler("account ids are required", 400));
    }

    await User.deleteMany({ _id: { $in: accountIds } })
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while deleting accounts", 500));
      });
  }
);

export const getAccountsCount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const count = await User.countDocuments()
      .then((count) => {
        return res.json({ count });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting users count", 500));
      });
  }
);

export const getIqaList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const iqaList = await User.find({ role: "iqa" })
      .select("_id firstName lastName")
      .then((iqaList) => {
        return res.json({ iqaList });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting IQA list", 500));
      });
  }
);

export const getEqaList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const eqaList = await User.find({ role: "eqa" })
      .select("_id firstName lastName")
      .then((eqaList) => {
        return res.json({ eqaList });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting EQA list", 500));
      });
  }
);

export const assignCoursesToIQA = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const { iqaId } = req.body;

    if (!iqaId || iqaId.trim() === "") {
      try {
        const course = await Course.findByIdAndUpdate(
          courseId,
          { $set: { iqaAssigned: [] } },
          { new: true }
        );
        return res
          .status(200)
          .json({ success: true, message: "Course unassigned" });
      } catch (error) {
        console.log("Error: ", error);
        return next(new ErrorHandler("Error while unassigning course", 500));
      }
    }

    try {
      const user = await User.findById(iqaId);
      if (!user || user.role !== "iqa") {
        return next(new ErrorHandler("Invalid user or role", 400));
      }

      const course = await Course.findByIdAndUpdate(
        courseId,
        // { $addToSet: { iqaAssigned: iqaId } },
        { iqaAssigned: [iqaId] },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Course assigned successfully" });
    } catch (error) {
      console.log("Error: ", error);
      return next(new ErrorHandler("Error while assigning course", 500));
    }
  }
);

export const assignCoursesToEQA = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const { eqaId } = req.body;

    if (!eqaId || eqaId.trim() === "") {
      try {
        const course = await Course.findByIdAndUpdate(
          courseId,
          { $set: { eqaAssigned: [] } },
          { new: true }
        );
        return res
          .status(200)
          .json({ success: true, message: "Course unassigned" });
      } catch (error) {
        console.log("Error: ", error);
        return next(new ErrorHandler("Error while unassigning course", 500));
      }
    }

    try {
      const user = await User.findById(eqaId);
      if (!user || user.role !== "eqa") {
        return next(new ErrorHandler("Invalid user or role", 400));
      }

      const course = await Course.findByIdAndUpdate(
        courseId,
        { eqaAssigned: [eqaId] },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Course assigned successfully" });
    } catch (error) {
      console.log("Error: ", error);
      return next(new ErrorHandler("Error while assigning course", 500));
    }
  }
);

export const unassignCoursesToIQA = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;

    try {
      const course = await Course.findByIdAndUpdate(
        courseId,
        {
          $set: { iqaAssigned: [] },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Course unassigned" });
    } catch (error) {
      console.log("Error: ", error);
      return next(new ErrorHandler("Error while assigning courses", 500));
    }
  }
);

// Agents

export const addNewAgent = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const agent = await Agent.findOne({ email: req.body.email });
    if (agent) {
      return next(
        new ErrorHandler("Agent profile with this email already exists", 400)
      );
    }

    const newAgent = new Agent({
      ...req.body,
      email: req.body.email.toLowerCase(),
    });

    await newAgent
      .save()
      .then(() => {
        return res.json({
          success: true,
          message: "New Agent profile added successfully.",
        });
      })
      .catch((err: any) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error adding new agent profile", 500));
      });
  }
);

export const updateAgent = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.id;
    if (!agentId) {
      return next(new ErrorHandler("Agent id is required", 400));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const existingAgent = await Agent.findOne({ email: req.body.email });
    if (existingAgent && existingAgent.id !== agentId) {
      return next(
        new ErrorHandler("Agent profile with this email already exists", 400)
      );
    }

    const updatedData = {
      ...req.body,
      email: req.body.email.toLowerCase(),
    };

    const agent = await Agent.findByIdAndUpdate(agentId, updatedData, {
      new: true,
    })
      .then((agent) => {
        return res.json(agent);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(
          new ErrorHandler("Error while updating agent profile", 500)
        );
      });
  }
);

export const getAgentById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.id;
    if (!agentId) {
      return next(new ErrorHandler("Agent id is required", 400));
    }

    const agent = await Agent.findById(agentId)
      .then((agent) => {
        return res.json(agent);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting agent profile", 500));
      });
  }
);

export const getAllAgents = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const agents = await Agent.find()
      .then((agents) => {
        return res.json({ agents });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting agents", 500));
      });
  }
);

export const deleteAgentById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.id;
    if (!agentId) {
      return next(new ErrorHandler("Agent id is required", 400));
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return next(new ErrorHandler("Agent profile not found", 404));
    }
    await agent.deleteOne();
    res.status(204).send();
  }
);

export const getAgentsList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const agents = await Agent.find()
      .select("_id name surname")
      .then((agents) => {
        return res.json({ agents });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting agents", 500));
      });
  }
);
// certificates

export const addNewCertificate = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const newCertificate = new Certificate({
      ...req.body,
      email: req.body.email ? req.body.email.toLowerCase() : "",
    });

    await newCertificate
      .save()
      .then(() => {
        return res.json({
          success: true,
          message: "New certificate added successfully.",
        });
      })
      .catch((err: any) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error adding new certificate", 500));
      });
  }
);

export const updateCertificate = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificateId = req.params.id;
    if (!certificateId) {
      return next(new ErrorHandler("Certificate id is required", 400));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    const updatedData = {
      ...req.body,
      email: req.body.email ? req.body.email.toLowerCase() : "",
    };

    const certificate = await Certificate.findByIdAndUpdate(
      certificateId,
      updatedData,
      {
        new: true,
      }
    )
      .then((certificate) => {
        return res.json(certificate);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while updating certificate", 500));
      });
  }
);

export const getCertificateById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificateId = req.params.id;
    if (!certificateId) {
      return next(new ErrorHandler("Certificate id is required", 400));
    }

    const certificate = await Certificate.findById(certificateId)
      .then((certificate) => {
        return res.json(certificate);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting certificate", 500));
      });
  }
);

export const getAllCertificates = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificates = await Certificate.find()
      .then((certificates) => {
        return res.json({ certificates });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting certificates", 500));
      });
  }
);

export const deleteCertificateById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificateId = req.params.id;
    if (!certificateId) {
      return next(new ErrorHandler("Certificate id is required", 400));
    }

    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
      return next(new ErrorHandler("Certificate not found", 404));
    }

    await certificate.deleteOne();
    res.status(204).send();
  }
);

export const uploadCertificate = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificateId = req.params.id;
    if (!certificateId) {
      return next(new ErrorHandler("Certificate id is required", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("No document provided", 400));
    }

    const fileBuffer = req.file?.buffer;
    const tempFilePath = path.join(tmpdir(), req.file.originalname);

    writeFileSync(tempFilePath, fileBuffer);

    try {
      const authClient = await authorizeGoogleApi();
      const folderId = "10GQkEnI-IGAoQpUZtgLZMyRHh6eo-xCs";

      const fileResponse = await uploadDocumentApi(
        authClient,
        tempFilePath,
        folderId
      );
      const fileId = fileResponse.id;

      const updatedData = { certificate: fileId };

      unlinkSync(tempFilePath);
      console.log("File deleted");

      await Certificate.findByIdAndUpdate(certificateId, updatedData, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Document uploaded",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      if (existsSync(tempFilePath)) {
        unlinkSync(tempFilePath);
      }
      return next(new ErrorHandler("Error uploading document", 500));
    }
  }
);

export const uploadCertificateDocuments = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificateId = req.params.id;
    if (!certificateId) {
      return next(new ErrorHandler("Certificate is required", 400));
    }

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const fileKeys = ["id1", "id2", "other"];
    const filesToUpload: Express.Multer.File[] = [];

    for (const key of fileKeys) {
      const file = fileWithFields[key] ? fileWithFields[key][0] : null;
      if (file) {
        const extension = getPdfDocImageExtension(file.mimetype);
        if (!extension) {
          return next(new ErrorHandler("Unsupported file type", 400));
        } else {
          filesToUpload.push(file);
        }
      }
    }

    if (filesToUpload.length === 0) {
      return next(new ErrorHandler("No valid file provided", 400));
    }

    const authClient = await authorizeGoogleApi();

    const bufferToStream = (buffer: Buffer): Readable => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // End of stream
      return stream;
    };

    interface FileMetaData {
      id: string;
      mimeType: string;
    }

    const folderId = "1vqxGJf8-IvLaI60zfFz0oiE4LzsCp96V";
    let updatedData: any = {};

    const uploadToGoogleDrive = async (
      file: Express.Multer.File,
      folderId: string
    ): Promise<FileMetaData> => {
      const filePath = file.originalname;
      const mimeType = file.mimetype;
      const fileStream = bufferToStream(file?.buffer);

      try {
        const driveFile = await uploadPdfImageApi(
          authClient,
          fileStream,
          filePath,
          folderId,
          mimeType
        );
        if (!driveFile) {
          throw new Error("Error uploading file to Google Drive");
        }
        return {
          id: driveFile.id as string,
          mimeType: mimeType,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Error uploading file to Google Drive");
      }
    };

    try {
      for (const file of filesToUpload) {
        const metaData = await uploadToGoogleDrive(file, folderId);
        updatedData[`${file.fieldname}`] = metaData.id;
        updatedData[`${file.fieldname}MimeType`] = metaData.mimeType;
      }

      const updatedCertificate = await Certificate.findByIdAndUpdate(
        certificateId,
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Document uploaded",
      });
    } catch (error) {
      console.error("Error in upload certificate document:", error);
      return next(new ErrorHandler("Error uploading document", 500));
    }
  }
);

export const uploadCertificateVideos = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const certificateId = req.params.id;
    if (!certificateId) {
      return next(new ErrorHandler("Certificate id is required", 400));
    }

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!fileWithFields) {
      return next(new ErrorHandler("No video file provided", 400));
    }

    const videoTypes = ["video1", "video2", "videoOther"];

    const videoFileFieldName = videoTypes.find((type) => fileWithFields[type]);

    if (!videoFileFieldName) {
      return next(new ErrorHandler("No valid video file provided", 400));
    }

    const videoFile = fileWithFields[videoFileFieldName]
      ? fileWithFields[videoFileFieldName][0]
      : null;
    if (!videoFile) {
      return next(new ErrorHandler("No valid video file provided", 400));
    }
    const unlinkAsync = promisify(unlink);

    try {
      const authClient = await authorizeGoogleApi();
      const drive = google.drive({ version: "v3", auth: authClient });

      const fileMetadata = {
        name: videoFile.originalname,
        parents: ["1b4ViNeJ1byMN04w2WuAI0EPXz13f2q-T"], // Folder ID
      };

      // const fileSize = videoFile.size;
      const media = {
        mimeType: videoFile.mimetype,
        body: createReadStream(videoFile.path),
        // body: Buffer.from(videoFile?.buffer), // Use the buffer directly
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
        uploadType: "resumable",
      });

      const fileId = response.data.id;
      const videoUrl = fileId;
      // // const videoUrl = `https://drive.google.com/uc?id=${fileId}`;

      // // Delete the temporary file from disk
      await unlinkAsync(videoFile.path);

      const updatedData = { [videoFileFieldName]: videoUrl };

      await Certificate.findByIdAndUpdate(certificateId, updatedData, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: "Video uploaded",
      });
    } catch (error) {
      console.log("ERROR:", error);
      if (videoFile.path) {
        await unlinkAsync(videoFile.path);
      }
      return next(new ErrorHandler("Error uploading file", 500));
    }
  }
);

export const sendCertificateByEmail = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { certificateId } = req.params;

      if (!certificateId) {
        return next(new ErrorHandler("Certificate ID is required", 404));
      }

      const certificate = await Certificate.findById(certificateId);
      if (!certificate) {
        return next(new ErrorHandler("Certificate not found", 404));
      }
      if (!certificate.email) {
        return next(new ErrorHandler("Email not found", 404));
      }
      if (!certificate.certificate) {
        return next(new ErrorHandler("Certificate not found", 404));
      }
      const authClient = await authorizeGoogleApi();

      // Retrieve file from Google Drive as a buffer
      const fileBuffer = await downloadFileFromGoogleDrive(
        authClient,
        certificate.certificate
      );

      // Send the file via email
      await sendEmailWithAttachment(
        certificate.email,
        "Your Certificate",
        // `Dear ${certificate.firstName + " " + certificate.surname}, please find your certificate attached.`,
        `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
  
  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
      <tr>
          <td>
              <table style="background-color: #f2f3f8; width:100%;  margin:0 auto;" width="100%" border="0"
                  align="center" cellpadding="0" cellspacing="0">
                  
                  <tr>
                      <td style="height:20px;">&nbsp;</td>
                  </tr>
                  <tr>
                      <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                              style="max-width:870px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                              <tr>
                                  <td style="height:40px;">
                                  <div style="text-align:center; margin-bottom: 2rem; margin-top: 1rem">
                                    <img src="https://rapidservicessolutions.co.uk/wp-content/uploads/2024/05/logo-01-1.png" alt="Logo" style="width: 150px; height: auto" />
                                  </div>
                                  </td>
                                  
                              </tr>
                              <tr>
                                <td style="padding:0 32px; font-size: 16px; line-height: 24px;">
                                  Dear ${
                                    certificate.firstName +
                                    " " +
                                    certificate.surname
                                  }, please find your certificate attached.
                                </td>
                                </tr>
                              <tr>
                                  <td style="height:40px;">&nbsp;</td>
                              </tr>
                          </table>
                      </td>
                      <tr>
                      <td style="height:20px;">&nbsp;</td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
</body>`,
        [{ filename: "certificate.pdf", data: fileBuffer }]
      );

      res.status(200).json({
        success: true,
        message: `Certificate sent to ${
          certificate.firstName + " " + certificate.surname
        }`,
      });
    } catch (error) {
      console.error("Error sending certificate:", error);
      return next(new ErrorHandler("Error sending certificate via email", 500));
    }
  }
);
//

export const uploadAccountDocuments = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const iqaId = req.params.id;
    if (!iqaId) {
      return next(new ErrorHandler("IQA is required", 400));
    }

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const fileKeys = ["iqaReport"];
    const filesToUpload: Express.Multer.File[] = [];

    for (const key of fileKeys) {
      const file = fileWithFields[key] ? fileWithFields[key][0] : null;
      if (file) {
        const extension = getPdfDocImageExtension(file.mimetype);
        if (!extension) {
          return next(new ErrorHandler("Unsupported file type", 400));
        } else {
          filesToUpload.push(file);
        }
      }
    }

    if (filesToUpload.length === 0) {
      return next(new ErrorHandler("No valid file provided", 400));
    }

    const authClient = await authorizeGoogleApi();

    const bufferToStream = (buffer: Buffer): Readable => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // End of stream
      return stream;
    };

    interface FileMetaData {
      id: string;
      mimeType: string;
    }

    const folderId = "1_ZXhgWnQPRMSeF8ZLc0fK_-Hv1bO1zcg";
    let updatedData: any = {};

    const uploadToGoogleDrive = async (
      file: Express.Multer.File,
      folderId: string
    ): Promise<FileMetaData> => {
      const filePath = file.originalname;
      const mimeType = file.mimetype;
      const fileStream = bufferToStream(file?.buffer);

      try {
        const driveFile = await uploadPdfImageApi(
          authClient,
          fileStream,
          filePath,
          folderId,
          mimeType
        );
        if (!driveFile) {
          throw new Error("Error uploading file to Google Drive");
        }
        return {
          id: driveFile.id as string,
          mimeType: mimeType,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Error uploading file to Google Drive");
      }
    };

    try {
      for (const file of filesToUpload) {
        const metaData = await uploadToGoogleDrive(file, folderId);
        updatedData[`${file.fieldname}`] = metaData.id;
        updatedData[`${file.fieldname}MimeType`] = metaData.mimeType;
      }

      const updatedIqa = await User.findByIdAndUpdate(iqaId, updatedData, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Document uploaded",
      });
    } catch (error) {
      console.error("Error in upload certificate document:", error);
      return next(new ErrorHandler("Error uploading document", 500));
    }
  }
);

// invoices

export const addNewInvoice = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.invoiceDate) {
      return next(new ErrorHandler("Invoice date is required", 400));
    }
    try {
      const invoiceData = req.body;
      const newInvoice = new Invoice(invoiceData);

      await newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (error: any) {
      if (error.code === 11000) {
        return next(
          new ErrorHandler("Duplicate invoice number. Please try again.", 400)
        );
      } else {
        return next(
          new ErrorHandler("An error occurred while creating the invoice.", 500)
        );
      }
    }
  }
);

// notifications
export const getAllNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await Notification.find()
      .then((notifications) => {
        return res.json({ notifications });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting notifications", 500));
      });
  }
);

export const getUnreadNotificationsCount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const count = await Notification.countDocuments({ read: false })
      .then((count) => {
        return res.json({ count });
      })
      .catch((err) => {
        console.log("Error: ", err);
        return next(new ErrorHandler("Error while getting notifications", 500));
      });
  }
);

export const readNotification = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationId = req.params.id;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(204).send();
  }
);

export const deleteNotification = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationId = req.params.id;
    await Notification.findByIdAndDelete(notificationId);
    res.status(204).send();
  }
);

type TeacherT = typeof Teacher & { _id: Types.ObjectId };

// cron jobs
// Don't save notification for a teacher if already saved

// nodeCron.schedule("* * * * *", async () => {
// run every minute

// nodeCron.schedule("0 0 * * *", async () => {  run every day at midnight
nodeCron.schedule("0 12 * * 2", async () => {
  // run every Tuesday at 12PM
  const notificationDate = new Date();
  notificationDate.setDate(notificationDate.getDate() + 45);

  async function createNotificationIfNotExists(teacher: any, content: string) {
    const existingNotification = await Notification.findOne({
      content: content,
      teacher: teacher._id,
    });
    if (!existingNotification) {
      const newNotification = new Notification({
        content,
        teacher: teacher._id,
      });
      await newNotification.save();
    }
  }

  const teachersWithExpiringPILicense = await Teacher.find({
    piLicenseExpiryDate: { $lte: notificationDate },
  });

  for (const teacher of teachersWithExpiringPILicense) {
    const daysLeftPI = Math.ceil(
      (teacher.piLicenseExpiryDate.getTime() - new Date().getTime()) /
        (1000 * 3600 * 24)
    );
    let content = `The PI license for ${teacher.name + " " + teacher.surname}`;
    content +=
      daysLeftPI < 0
        ? ` expired on ${teacher.piLicenseExpiryDate.toLocaleDateString()}.`
        : ` will expire in ${daysLeftPI} days.`;
    await createNotificationIfNotExists(teacher, content);
  }

  const teachersWithExpiringSIALicense = await Teacher.find({
    siaLicenseExpiryDate: { $lte: notificationDate },
  });

  for (const teacher of teachersWithExpiringSIALicense) {
    const daysLeftSIA = Math.ceil(
      (teacher.siaLicenseExpiryDate.getTime() - new Date().getTime()) /
        (1000 * 3600 * 24)
    );
    let content = `The SIA license for ${teacher.name + " " + teacher.surname}`;
    content +=
      daysLeftSIA < 0
        ? ` expired on ${teacher.siaLicenseExpiryDate.toLocaleDateString()}.`
        : ` will expire in ${daysLeftSIA} days.`;
    await createNotificationIfNotExists(teacher, content);
  }
});

// Send email after 3 years of course end date
const sendRenewalEmails = async () => {
  try {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() - 3); // Go back 3 years
    targetDate.setMonth(targetDate.getMonth() + 2); // Add 2 months

    // Find courses that are approaching their 3-year mark
    const courses = await Course.find({
      courseEndDate: {
        $lte: targetDate,
      },
    });

    for (const course of courses) {
      const students = await Student.find({ courseId: course._id });

      for (const student of students) {
        const emailData: any = {
          from: `Rapid Services Solutions <${process.env.EMAIL_FROM}>`,
          to: student.email,
          subject: "Course Registration Renewal",
          html: `<p>Dear ${student.firstName}, it's time to renew your registration for ${course.courseName}.</p>`,
        };

        // Send the email
        mg.messages
          .create(process.env.MAILGUN_DOMAIN_NAME as string, emailData)
          .then(() => {
            console.log(`Email sent to ${student.email}`);
          })
          .catch((error) => {
            console.error(`Error sending email to ${student.email}:`, error);
          });
      }
    }
  } catch (error) {
    console.error("Error in sendRenewalEmails:", error);
  }
};

nodeCron.schedule("0 11 * * 1#1", () => {
  console.log(
    "Running sendRenewalEmails on the first Monday of the month at 11 AM"
  );
  sendRenewalEmails();
});
