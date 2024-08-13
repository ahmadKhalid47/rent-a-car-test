import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    piLicenseExpiryDate: {
      type: Date,
      required: true,
    },
    siaLicenseExpiryDate: {
      type: Date,
      required: true,
    },
    aetCertificateDate: {
      type: Date,
      required: true,
    },
    lvl3FirstAidCertExpiryDate: {
      type: Date,
    },
    cvFile: {
      type: String,
    },
    cvFileMimeType: {
      type: String,
    },
    aetCertificateFile: {
      type: String,
    },
    aetCertificateFileMimeType: {
      type: String,
    },
    cmCertificateFile: {
      type: String,
    },
    cmCertificateFileMimeType: {
      type: String,
    },
    lv3FirstAidCert: {
      type: String,
    },
    lv3FirstAidCertMimeType: {
      type: String,
    },
    cpdFile: {
      type: String,
    },
    cpdFileMimeType: {
      type: String,
    },
    lv3PiCert: {
      type: String,
    },
    lv3PiCertMimeType: {
      type: String,
    },
    piLicense: {
      type: String,
    },
    piLicenseMimeType: {
      type: String,
    },
    otherDocument: {
      type: String,
    },
    otherDocumentMimeType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
