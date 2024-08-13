import mongoose from "mongoose";
const timeSlotSchema = new mongoose.Schema({
  slotName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  examDate: {
    type: Date,
  },
  studentsCapacity: {
    type: Number,
    required: true,
    default: 24,
  },
  numberOfStudents: {
    type: Number,
    default: 0,
  },
}, );
const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      maxlength: [50, "Course name cannot exceed 250 characters"],
    },
    timeSlots: [timeSlotSchema],
    thumbnail: {
      type:String,
      required:true
    },
   
    scheduleId: {
      type: String,
    },
    acmScheduleId: {
      type: String,
      required: [true, "ACM Schedule ID is required"],
    },
    acmScheduleTime: {
      type: String,
      required: [true, "ACM Schedule time is required"],
    },
    apiScheduleId: {
      type: String,
      required: [true, "API Schedule ID is required"],
    },
    apiScheduleTime: {
      type: String,
      required: [true, "API Schedule time is required"],
    },
    pwdsScheduleId: {
      type: String,
      required: [true, "PWDS Schedule ID is required"],
    },
    pwdsScheduleTime: {
      type: String,
      required: [true, "PWDS Schedule time is required"],
    },
    wipsiScheduleId: {
      type: String,
      required: [true, "WIPSI ACM Schedule ID is required"],
    },
    wipsiScheduleTime: {
      type: String,
      // required: [true, "WIPSI ACM Schedule time is required"],
    },

    firstAidCourseDate: {
      type: Date,
      required: true,
    },
    mainTutor: {
      type: String,
      // required: [true, "Main tutor is required"],
    },
    mainTutorId: {
      type: String,
      // required: [true, "Main tutor is required"],
    },
    secondaryTutor: {
      type: String,
      // required: [true, "Secondary tutor is required"],
    },
    secondaryTutorId: {
      type: String,
      // required: [true, "Secondary tutor is required"],
    },
    invigilator: {
      type: String,
    },
    invigilatorId: {
      type: String,
    },
    datePrinted: {
      type: Date,
    },
    witnessedByName: {
      type: String,
    },
    datePapers: {
      type: Date,
    },
    dateTime: {
      type: String,
    },
    // papersDestroyed: {
    //   type: String,
    // },
    witnessedBy: {
      type: String,
    },
    notes: {
      type: String,
    },
    uploadNominal: {
      type: String,
    },
    uploadNominalMimeType: {
      type: String,
    },
    uploadAttendance: {
      type: String,
    },
    uploadAttendanceMimeType: {
      type: String,
    },
    uploadCid: {
      type: String,
    },
    uploadCidMimeType: {
      type: String,
    },
    uploadOther: {
      type: String,
    },
    uploadOtherMimeType: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    iqaAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eqaAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: String,
      // required: true,
    },
   
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
