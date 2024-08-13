import { Decimal128, ObjectId } from "mongodb";
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    courseVenue: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    courseTitle: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    courseId: {
      // type: String,
      // required: function (this: { isSubmitted: boolean }) {
      //   return this.isSubmitted;
      // },
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
      index: true,
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course.timeSlots",
      required: true,
    },
    timeSlot:{
      type: Object,
      // required: true,
    },

    avatar: { type: String },
    registrationId: {
      type: String,
    },
    firstName: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    surname: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    title: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    gender: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    dob: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    address: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    city: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    postcode: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    mobile: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    countryOfBirth: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    nationality: {
      type: String,
      required: function (this: { isSubmitted: boolean }) {
        return this.isSubmitted;
      },
    },
    englishQualification: {
      type: String,
    },
    certificateExpiryDate: {
      type: String,
    },
    certificate: {
      type: String,
    },
    certificateType: {
      type: String,
    },
    disabilityStatus: {
      type: String,
      // enum: ["yes", "no", "not-disclosed"],
    },
    id1Document: {
      type: String,
    },
    id1Type: {
      type: String,
    },
    id1Code: {
      type: String,
    },
    id1Image: {
      type: String,
    },
    id2Document: {
      type: String,
    },
    id2Description: {
      type: String,
    },
    id2Type: {
      type: String,
    },
    id2Code: {
      type: String,
    },
    id2Image: {
      type: String,
    },
    id2Image2: {
      type: String,
    },
    id3Document: {
      type: String,
    },
    id3Description: {
      type: String,
    },
    id3Type: {
      type: String,
    },
    id3Code: {
      type: String,
    },
    id3Image: {
      type: String,
    },
    id3Image2: {
      type: String,
    },
    other1: {
      type: String,
    },
    other1MimeType: {
      type: String,
    },
    other2: {
      type: String,
    },
    other2MimeType: {
      type: String,
    },
    other3: {
      type: String,
    },
    other3MimeType: {
      type: String,
    },
    document: {
      type: String,
    },
    documentMimeType: {
      type: String,
    },
    uploadedNominal: {
      type: String,
    },
    uploadedNominalMimeType: {
      type: String,
    },
    uploadedAttendance: {
      type: String,
    },
    uploadedAttendanceMimeType: {
      type: String,
    },
    folderLink: {
      type: String,
    },
    englishAssessmentVideo: {
      type: String,
    },
    firstAidVideo1: {
      type: String,
    },
    firstAidVideo2: {
      type: String,
    },
    searchingQAVideo: {
      type: String,
    },
    searchingProcedureVideo: {
      type: String,
    },
    cMQAVideo: {
      type: String,
    },
    cMDemoVideo: {
      type: String,
    },
    physicalInterventionVideo: {
      type: String,
    },
    piVideo1: {
      type: String,
    },
    piVideo2: {
      type: String,
    },
    piVideo3: {
      type: String,
    },
    piVideo4: {
      type: String,
    },
    piVideo5: {
      type: String,
    },
    piVideo6: {
      type: String,
    },
    piVideo7: {
      type: String,
    },
    piVideo8: {
      type: String,
    },
    piVideo9: {
      type: String,
    },
    piVideo10: {
      type: String,
    },
    piVideo11: {
      type: String,
    },
    piVideo12: {
      type: String,
    },
    piVideo13: {
      type: String,
    },

    acmStatus: {
      type: String,
      enum: ["pass", "fail", "pending", ""],
      default: "",
    },
    apiStatus: {
      type: String,
      enum: ["pass", "fail", "pending", ""],
      default: "",
    },
    pwdsStatus: {
      type: String,
      enum: ["pass", "fail", "pending", ""],
      default: "",
    },
    wipsiStatus: {
      type: String,
      enum: ["pass", "fail", "pending", ""],
      default: "",
    },
    nextExamDate: {
      type: Date,
    },
    invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }],
    addedByAdmin: {
      type: Boolean,
      default: false,
    },
    // Fee info
    agentId: {
      type: ObjectId,
      ref: "Agent",
      required: false,
      default: null,
    },
    agentName: {
      type: String,
      required: false,
    },
    agentSurname: {
      type: String,
      required: false,
    },
    fee: {
      type: Decimal128,
      required: false,
    },
    deposit: {
      type: Decimal128,
      required: false,
    },
    cash: {
      type: Decimal128,
    },
    bank: {
      type: Decimal128,
      required: false,
    },
    remainingFee: {
      type: Decimal128,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
    eqaAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //
    uniqueUrl: {
      type: String,
      required: function (this: { addedByAdmin: boolean }) {
        return !this.addedByAdmin;
      },
      unique: true,
    },
    isSubmitted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

studentSchema.index(
  { email: 1, isSubmitted: 1 },
  { unique: true, partialFilterExpression: { isSubmitted: true } }
);

studentSchema.index(
  { registrationId: 1, isSubmitted: 1 },
  { unique: true, partialFilterExpression: { isSubmitted: true } }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
