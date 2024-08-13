import { check } from "express-validator";

export const loginValidator = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required with 6 or more characters").isLength({
    min: 6,
  }),
];

export const addAccountValidator = [
  check("firstName", "First name is required").isString().notEmpty(),
  check("lastName", "Last name is required").isString().notEmpty(),
  check("dob", "Date of birth is required").isString().notEmpty(),
  check("email", "Email is required")
    .isString()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email address"),
  check("mobile", "Mobile number is required").isString().notEmpty(),
  check("password", "Password is required")
    .isString()
    .notEmpty()
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be between 6 and 100 characters"),
  check("role", "Role is required").isString().notEmpty(),
  check("username", "Username is required").isString().notEmpty(),
];

export const updateAccountValidator = [
  check("firstName", "First name is required").isString().notEmpty(),
  check("lastName", "Last name is required").isString().notEmpty(),
  check("dob", "Date of birth is required").isString().notEmpty(),
  check("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be between 6 and 100 characters"),
  check("mobile", "Mobile number is required").isString().notEmpty(),
  check("role", "Role is required").isString().notEmpty(),
  check("username", "Username is required").isString().notEmpty(),
];

export const addCourseValidator = [
  check("courseName", "Course name is required").isString().notEmpty(),
  check("courseStartDate", "Course start date is required")
    .isString()
    .notEmpty(),
  check("courseEndDate", "Course end date is required").isString().notEmpty(),
  check("studentsCapacity", "Students capacity is required")
    .notEmpty()
    .isNumeric()
    .withMessage("Students capacity should be a number"),
  check("scheduleId").isString().optional(),
  check("acmScheduleId", "ACM schedule ID is required").isString().notEmpty(),
  check("acmScheduleTime", "ACM schedule time is required")
    .isString()
    .notEmpty(),
  check("apiScheduleId", "API schedule ID is required").isString().notEmpty(),
  check("apiScheduleTime", "API schedule time is required")
    .isString()
    .notEmpty(),
  check("pwdsScheduleId", "PWDS schedule ID is required").isString().notEmpty(),
  check("pwdsScheduleTime", "PWDS schedule time is required")
    .isString()
    .notEmpty(),
  check("wipsiScheduleId", "WIPSI schedule ID is required")
    .isString()
    .notEmpty(),
  check("wipsiScheduleTime", "WIPSI schedule time is required")
    .isString()
    .notEmpty(),
  check("firstAidCourseDate", "First aid course date is required")
    .isString()
    .notEmpty(),
  check("datePrinted").isString().optional(),
  check("witnessedByName").isString().optional(),
  check("datePapers").isString().optional(),
  check("dateTime").isString().optional(),
  // check("papersDestroyed").isString().optional(),
  check("witnessedBy").isString().optional(),
  check("notes").isString().isLength({ max: 100 }).optional(),
  check("mainTutor", "Main tutor is required").isString().notEmpty(),
  check("secondaryTutor", "Secondary tutor is required").isString().notEmpty(),
  check("invigilator").optional(),
  check("isActive", "Active or not is required").isBoolean().notEmpty(),
];

export const addTeacherValidator = [
  check("name", "Name is required").isString().notEmpty(),
  check("surname", "Surname is required").isString().notEmpty(),
  check("email", "Email is required")
    .isString()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email address"),
  check("mobile", "Mobile number is required").isString().notEmpty(),
  check("piLicenseExpiryDate").isString().optional(),
  check("siaLicenseExpiryDate", "SIA license expiry date is required")
    .isString()
    .notEmpty(),
  check("aetCertificateDate", "AET certificate date is required")
    .isString()
    .notEmpty(),
];

export const addStudentValidator = [
  check("courseVenue", "Course venue is required").isString().notEmpty(),
  check("courseTitle", "Course title is required").isString().notEmpty(),
  check("title", "Title is required").isString().notEmpty(),
  check("gender", "Gender is required").isString().notEmpty(),
  check("firstName", "First name is required").isString().notEmpty(),
  check("surname", "Surname is required").isString().notEmpty(),
  check("dob", "Date of birth is required").isString().notEmpty(),
  check("address", "Address is required").isString().notEmpty(),
  check("city", "City is required").isString().notEmpty(),
  check("postcode", "Postcode is required")
    .isString()
    .isLength({ max: 10 })
    .withMessage("Postcode cannot be more than 10 characters"),
  check("mobile", "Mobile number is required")
    .isString()
    .isLength({ min: 10, max: 16 })
    .withMessage(
      "Mobile number cannot be less than 10 or more than 16 characters"
    ),
  check("email", "Email is required")
    .isString()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email address"),
  check("countryOfBirth", "Country of birth is required").isString().notEmpty(),
  check("nationality", "Nationality is required").isString().notEmpty(),
  check("englishQualification", "English qualification answer is required")
    .isString()
    .notEmpty(),
  check("disabilityStatus", "Disability status answer is required")
    .isString()
    .notEmpty(),
  // Fee info
  check("agentId").optional(),
  check("agentName").isString().optional(),
  check("agentSurname").isString().optional(),
  check("fee").isString().optional(),
  check("deposit").isString().optional(),
  check("cash").isString().optional(),
  check("bank").isString().optional(),
  check("remainingFee").isString().optional(),
];

export const addAgentValidator = [
  check("name", "Name is required").isString().notEmpty(),
  check("surname", "Surname is required").isString().notEmpty(),
  check("dob").isString().optional(),
  check("email").isString().optional(),
  check("phone", "Phone number is required").isString().notEmpty(),
];

export const addCertificateValidator = [
  check("firstName", "First name is required").isString().notEmpty(),
  check("surname", "Surname is required").isString().notEmpty(),
  check("dob").isString().optional(),
  check("issueDate").isString().optional(),
  check("refNumber").isString().optional(),
  check("email").isString().optional(),
  check("phone").isString().optional(),
];
