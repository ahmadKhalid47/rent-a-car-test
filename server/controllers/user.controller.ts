import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import Student from "../models/student";
import { validationResult } from "express-validator";
import Course from "../models/course";
import mongoose from "mongoose";
import { mg } from "../utils/email";
import { studentAddEmail } from "../utils/studentAddEmail";

export const getOnlineFormUrl = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { uniqueUrl } = req.params;
    const form = await Student.findOne({ uniqueUrl });

    if (!form) {
      return next(new ErrorHandler("Form not found", 404));
    }
    // if (!form.expiresAt) {
    //   return next(new ErrorHandler("Invalid form", 400));
    // }

    if (form.isSubmitted) {
      return res.json({
        isSubmitted: true,
        courseId: form.courseId,
        courseTitle: form.courseTitle,
      });
    }

    // if (new Date() > form.expiresAt) {
    //   return res.json({
    //     isExpired: true,
    //   });
    // }

    // courseId: req.body.courseId ? req.body.courseId : "",
    //   courseTitle: req.body.courseTitle ? req.body.courseTitle : "",

    return res.json({
      isSubmitted: false,
      courseId: form.courseId,
      courseTitle: form.courseTitle,
    });
  }
);

let gfsBucketStudent: mongoose.mongo.GridFSBucket;

const connStudent = mongoose.connection;
connStudent.once("open", () => {
  gfsBucketStudent = new mongoose.mongo.GridFSBucket(connStudent.db, {
    bucketName: "studentfiles", // collection name
  });
});

export const userOnlineForm = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { uniqueUrl } = req.params;
    const form = await Student.findOne({ uniqueUrl });

    if (
      !form ||
      form.isSubmitted
      // || (form.expiresAt && new Date() > form.expiresAt)
    ) {
      return next(new ErrorHandler("This form is not valid", 400));
    }

    if (!req.body.courseId) {
      return next(new ErrorHandler("Course is required", 400));
    }

    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
   
    if (course.timeSlots.length === 0) {
      return next(new ErrorHandler("Course has no available time slots", 400));
    }

    const timeSlotId = req.body.timeSlotId;
    const timeSlot = course.timeSlots.id(timeSlotId);

    if (!timeSlot) {
      return next(new ErrorHandler("Time slot not found", 404));
    }

    if (timeSlot.studentsCapacity <= timeSlot.numberOfStudents) {
      return next(new ErrorHandler("Time slot is full", 400));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;
      return next(new ErrorHandler(err, 400));
    }

    if (!req.body.email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const existingStudent = await Student.findOne({ email: req.body.email });

    if (existingStudent) {
      return next(
        new ErrorHandler("Student profile with this email already exists", 400)
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

    form.set({
      ...req.body,
      email: req.body.email.toLowerCase(),
      registrationId: newRegistrationId,
      isSubmitted: true,
    });

    const fileWithFields = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (
      fileWithFields.avatar &&
      fileWithFields.avatar[0].size > 10 * 1024 * 1024
    ) {
      return next(
        new ErrorHandler("Avatar size cannot be more than 10 mb", 400)
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
      ? Buffer.from(fileWithFields.avatar[0].buffer).toString("base64")
      : null;

    if (base64Avatar) {
      form.avatar = base64Avatar;
    }

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
          const cvUploadStream = gfsBucketStudent.openUploadStream(
            `cert-${form._id}${extensionCertificate}`,
            {
              metadata: {
                contentType: certificate?.mimetype,
                studentId: form._id,
              },
            }
          );
          cvUploadStream.end(certificate.buffer);
          cvUploadStream.on("finish", () => {
            resolve(cvUploadStream.id.toString());
          });
          cvUploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve("");
        }
      }),

      new Promise<string>((resolve, reject) => {
        if (id1Image) {
          const id1UploadStream = gfsBucketStudent.openUploadStream(
            `id1-${form._id}${extensionId1Image}`,
            {
              metadata: {
                contentType: id1Image?.mimetype,
                studentId: form._id,
              },
            }
          );
          id1UploadStream.end(id1Image?.buffer);
          id1UploadStream.on("finish", () => {
            resolve(id1UploadStream.id.toString());
          });
          id1UploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve("");
        }
      }),
      new Promise<string>((resolve, reject) => {
        if (id2Image) {
          const id2UploadStream = gfsBucketStudent.openUploadStream(
            `id2-${form._id}${extensionId2Image}`,
            {
              metadata: {
                contentType: id2Image?.mimetype,
                studentId: form._id,
              },
            }
          );
          id2UploadStream.end(id2Image?.buffer);
          id2UploadStream.on("finish", () => {
            resolve(id2UploadStream.id.toString());
          });
          id2UploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve("");
        }
      }),
      new Promise<string>((resolve, reject) => {
        if (id3Image) {
          const id3UploadStream = gfsBucketStudent.openUploadStream(
            `id3-${form._id}${extensionId3Image}`,
            {
              metadata: {
                contentType: id3Image?.mimetype,
                studentId: form._id,
              },
            }
          );
          id3UploadStream.end(id3Image?.buffer);
          id3UploadStream.on("finish", () => {
            resolve(id3UploadStream.id.toString());
          });
          id3UploadStream.on("error", (err) => {
            reject(err);
          });
        } else {
          resolve("");
        }
      }),
    ];

    const data = studentAddEmail;

    Promise.all(uploadPromises)
      .then(([certificate, id1FileId, id2FileId, id3FileId]) => {
        form.certificate = certificate;
        form.id1Image = id1FileId;
        form.id2Image = id2FileId;
        form.id3Image = id3FileId;

        form
          .save()
          .then(() => {
            timeSlot.numberOfStudents = timeSlot.numberOfStudents + 1;
            course
              .save()
              .then(() => {
                mg.messages
                  .create(
                    process.env.MAILGUN_DOMAIN_NAME as string,
                    data(form)
                  )
                  .then(() => {
                    return res.json({
                      success: true,
                      message: "Form submitted successfully.",
                    });
                  })
                  .catch((error) => {
                    console.log("Error In Mailgun:", error);
                    return next(
                      new ErrorHandler(
                        "Form submitted successfully but email was not sent",
                        403
                      )
                    );
                  });
              })
              .catch((err: any) => {
                console.log("Error: ", err);
                return next(
                  new ErrorHandler("Error while submitting form", 500)
                );
              });
          })
          .catch((err: any) => {
            console.log("Error: ", err);
            return next(
              new ErrorHandler(
                "An error occurred while submitting the form",
                500
              )
            );
          });
      })
      .catch((err) => {
        return next(new ErrorHandler("Error while saving file", 500));
      });
  }
);
