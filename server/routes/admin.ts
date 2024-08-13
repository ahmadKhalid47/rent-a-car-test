import express, { Request, Response } from "express";
import multer from "multer";
import { upload } from "../middlewares/multerMiddleware";
import Category from "../models/category";
import {
  generateOnlineFormUrl,
  //
  login,
  getProfile,
  //
  addNewTeacher,
  updateTeacher,
  getTeacherById,
  getAllTeachers,
  deleteTeacherById,
  deleteManyTeacherProfiles,
  searchTeacher,
  getTeachersList,
  getTeachersFile,
  //
  addNewCourse,
  updateCourse,
  getCourseById,
  getAllCourses,
  deleteCourseById,
  deleteManyCourses,
  getCoursesList,
  getCoursesCount,
  uploadCourseDocuments,
  //
  addNewStudent,
  updateStudent,
  getStudentById,
  getAllStudents,
  deleteStudentById,
  deleteManyStudents,
  getStudentsCount,
  getAllStudentsByCourseId,
  getAllStudentsByCourseIdOnlyActive,
  getAllStudentsByCourseIdForFee,
  getAllStudentsByAgentId,
  getFailedStudentsByCourseId,
  getStudentsFile,
  uploadScannedDocument,
  uploadVideos,
  uploadOtherDocument,
  assignStudentToEQA,
  //
  uploadVideo,
  toggleStudentProfile,
  //
  addNewAccount,
  updateAccount,
  getAccountById,
  getAllAccounts,
  deleteAccountById,
  deleteManyAccounts,
  getAccountsCount,
  getIqaList,
  getEqaList,
  //
  addNewAgent,
  updateAgent,
  getAgentById,
  getAllAgents,
  deleteAgentById,
  getAgentsList,
  //
  addNewCertificate,
  updateCertificate,
  getCertificateById,
  getAllCertificates,
  deleteCertificateById,
  uploadCertificate,
  uploadCertificateDocuments,
  //
  getAllNotifications,
  getUnreadNotificationsCount,
  readNotification,
  deleteNotification,
  uploadAccountDocuments,
  assignCoursesToIQA,
  assignCoursesToEQA,
  uploadCertificateVideos,
  studentPassFail,
  getInvigilatorList,
  sendCertificateByEmail,
  registerAdmin,
  addCategory,
  
} from "../controllers/admin.controller";
import {
  addAccountValidator,
  updateAccountValidator,
  addCourseValidator,
  addTeacherValidator,
  addStudentValidator,
  loginValidator,
  addAgentValidator,
  addCertificateValidator,
} from "../validators/admin";
import {
  authenticateToken,
  hocAdminInvigilatorCheck,
  userCheck,
} from "../middlewares/authMiddleware";
import { existsSync, mkdirSync } from "fs";


const router = express.Router();

const videoFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
    return cb(new Error("Video file type is not supported!"), false);
  }
  cb(null, true);
};

const documentFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
    return cb(new Error("Video file type is not supported!"), false);
  }
  cb(null, true);
};

const uploadTenMb = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

const uploadVideoMulterMemory = multer({
  fileFilter: videoFilter,
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024, // 10GB
  },
});

const uploadVideoMulterStorage = multer({
  fileFilter: videoFilter,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // cb(null, path.join(__dirname, "../uploads"));
      if (!existsSync("./uploads")) {
        mkdirSync("./uploads");
      }

      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024, // 10GB
  },
});

const uploadDocumentMulter = multer({
  fileFilter: documentFilter,
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for documents
  },
});

router.post("/generate-url", uploadTenMb.none(), generateOnlineFormUrl);

// auth routes
router.post('/register',registerAdmin)
router.post("/login", loginValidator, login);
router.get("/get-profile", getProfile);
router.post("/logout", (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).send({
    success: true,
  });
});


router.post("/add-category",addCategory)
                                        // ! student routes
router.post(
  "/add-new-student",
  hocAdminInvigilatorCheck,
  uploadTenMb.fields([
    { name: "avatar" },
    { name: "certificate" },
    { name: "id1Image" },
    { name: "id2Image" },
    { name: "id2Image2" },
    { name: "id3Image" },
    { name: "id3Image2" },
  ]),
  addStudentValidator,
  addNewStudent
);
router.patch(
  "/update-student/:id",
  hocAdminInvigilatorCheck,
  uploadTenMb.fields([
    { name: "avatar" },
    { name: "certificate" },
    { name: "id1Image" },
    { name: "id2Image" },
    { name: "id2Image2" },
    { name: "id3Image" },
    { name: "id3Image2" },
  ]),
  addStudentValidator,
  updateStudent
);
router.get("/get-student/:id", getStudentById);
router.get("/get-all-students", userCheck, getAllStudents);
router.delete(
  "/delete-student/:id",
  hocAdminInvigilatorCheck,
  deleteStudentById
);
router.delete(
  "/delete-many-student-profiles",
  hocAdminInvigilatorCheck,
  deleteManyStudents
);
router.get("/total-students", authenticateToken, getStudentsCount);
router.get(
  "/get-course-students/:id",
  authenticateToken,
  getAllStudentsByCourseId
);
router.get(
  "/get-course-students-active/:id",
  authenticateToken,
  getAllStudentsByCourseIdOnlyActive
);
router.get(
  "/get-course-students-for-fee/:id",
  authenticateToken,
  getAllStudentsByCourseIdForFee
);
router.get(
  "/get-students-by-agent/:id",
  authenticateToken,
  getAllStudentsByAgentId
);
router.get(
  "/get-failed-students-by-course/:id",
  authenticateToken,
  getFailedStudentsByCourseId
);
//
router.get("/get-students-file/:id", uploadTenMb.none(), getStudentsFile);
//
router.patch(
  "/toggle-student-profile/:id",
  userCheck,
  uploadTenMb.none(),
  toggleStudentProfile
);
router.patch(
  "/update-result/:id",
  userCheck,
  uploadTenMb.none(),
  studentPassFail
);
//
router.post(
  "/upload-scanned-doc/:id",
  userCheck,
  uploadDocumentMulter.single("document"),
  uploadScannedDocument
);
router.post(
  "/upload-other-document/:id",
  userCheck,
  uploadTenMb.fields([
    { name: "other1" },
    { name: "other2" },
    { name: "other3" },
    { name: "document" },
    { name: "uploadedNominal" },
    { name: "uploadedAttendance" },
  ]),
  uploadOtherDocument
);
//
router.post(
  "/upload-video/:id",
  userCheck,
  uploadVideoMulterMemory.fields([
    { name: "englishAssessmentVideo" },
    { name: "firstAidVideo1" },
    { name: "firstAidVideo2" },
    { name: "searchingQAVideo" },
    { name: "searchingProcedureVideo" },
    { name: "cMQAVideo" },
    { name: "cMDemoVideo" },
    { name: "physicalInterventionVideo" },
    { name: "piVideo1" },
    { name: "piVideo2" },
    { name: "piVideo3" },
    { name: "piVideo4" },
    { name: "piVideo5" },
    { name: "piVideo6" },
    { name: "piVideo7" },
    { name: "piVideo8" },
    { name: "piVideo9" },
    { name: "piVideo10" },
    { name: "piVideo11" },
    { name: "piVideo12" },
    { name: "piVideo13" },
  ]),
  uploadVideo
);

router.post("/upload-videos/:id", uploadVideoMulterStorage.any(), uploadVideos);
router.patch("/assign-student-eqa/:studentId", userCheck, assignStudentToEQA);
// teacher routes
router.post(
  "/add-new-teacher",
  hocAdminInvigilatorCheck,
  uploadTenMb.fields([
    { name: "cvFile" },
    { name: "aetCertificateFile" },
    { name: "cmCertificateFile" },
    { name: "lv3FirstAidCert" },
    { name: "cpdFile" },
    { name: "lv3PiCert" },
    { name: "piLicense" },
    { name: "otherDocument" },
  ]),
  addTeacherValidator,
  addNewTeacher
);
router.patch(
  "/update-teacher/:id",
  hocAdminInvigilatorCheck,
  uploadTenMb.fields([
    { name: "cvFile" },
    { name: "aetCertificateFile" },
    { name: "cmCertificateFile" },
    { name: "lv3FirstAidCert" },
    { name: "cpdFile" },
    { name: "lv3PiCert" },
    { name: "piLicense" },
    { name: "otherDocument" },
  ]),
  addTeacherValidator,
  updateTeacher
);
router.get("/get-teacher/:id", getTeacherById);
router.get("/get-all-teachers", getAllTeachers);
router.delete(
  "/delete-teacher/:id",
  hocAdminInvigilatorCheck,
  deleteTeacherById
);
router.delete(
  "/delete-many-teacher-profiles",
  hocAdminInvigilatorCheck,
  deleteManyTeacherProfiles
);
router.post("/search-teacher", searchTeacher);
router.get("/get-teachers-list", getTeachersList);
//
router.get("/get-teachers-file/:id", uploadTenMb.none(), getTeachersFile);

// course routes
router.post(
  "/add-new-course",
  hocAdminInvigilatorCheck,
  // addCourseValidator,
  addNewCourse,
  upload.single('thumbnail'),
);
router.patch(
  "/update-course/:id",
  hocAdminInvigilatorCheck,
  addCourseValidator,
  updateCourse
);
router.get("/get-course/:id", getCourseById);
router.get("/get-all-courses", authenticateToken, getAllCourses);
router.delete("/delete-course/:id", hocAdminInvigilatorCheck, deleteCourseById);
router.delete(
  "/delete-many-courses",
  hocAdminInvigilatorCheck,
  deleteManyCourses
);
router.get("/get-courses-list", getCoursesList);
router.get("/total-courses", authenticateToken, getCoursesCount);
router.post(
  "/upload-course-documents/:id",
  userCheck,
  uploadDocumentMulter.fields([
    { name: "uploadNominal" },
    { name: "uploadAttendance" },
    { name: "uploadCid" },
    { name: "uploadOther" },
  ]),
  uploadCourseDocuments
);

// account routes
router.post(
  "/add-new-account",
  hocAdminInvigilatorCheck,
  uploadTenMb.single("avatar"),
  addAccountValidator,
  addNewAccount
);
router.patch(
  "/update-account/:id",
  hocAdminInvigilatorCheck,
  uploadTenMb.single("avatar"),
  updateAccountValidator,
  updateAccount
);
router.get("/get-account/:id", authenticateToken, getAccountById);
router.get("/get-all-accounts", authenticateToken, getAllAccounts);
router.delete(
  "/delete-account/:id",
  hocAdminInvigilatorCheck,
  deleteAccountById
);
router.delete(
  "/delete-many-accounts",
  hocAdminInvigilatorCheck,
  deleteManyAccounts
);
router.get("/total-accounts", authenticateToken, getAccountsCount);
router.patch(
  "/assign-course-iqa/:courseId",
  authenticateToken,
  assignCoursesToIQA
);
router.patch(
  "/assign-course-eqa/:courseId",
  authenticateToken,
  assignCoursesToEQA
);
router.get("/get-iqa-list", getIqaList);
router.get("/get-eqa-list", getEqaList);
router.get("/get-invigilator-list", getInvigilatorList);

//
router.post(
  "/upload-account-documents/:id",
  authenticateToken,
  uploadDocumentMulter.fields([{ name: "iqaReport" }]),
  uploadAccountDocuments
);
//

// agent routes
router.post(
  "/add-new-agent",
  hocAdminInvigilatorCheck,
  uploadTenMb.none(),
  addAgentValidator,
  addNewAgent
);
router.patch(
  "/update-agent/:id",
  hocAdminInvigilatorCheck,
  uploadTenMb.none(),
  addAgentValidator,
  updateAgent
);
router.get("/get-agent/:id", getAgentById);
router.get("/get-all-agents", getAllAgents);
router.delete("/delete-agent/:id", hocAdminInvigilatorCheck, deleteAgentById);
router.get("/get-agents-list", getAgentsList);

// certificate routes
router.post(
  "/add-new-certificate",
  hocAdminInvigilatorCheck,
  uploadTenMb.none(),
  addCertificateValidator,
  addNewCertificate
);
router.patch(
  "/update-certificate/:id",
  hocAdminInvigilatorCheck,
  uploadTenMb.none(),
  addCertificateValidator,
  updateCertificate
);
router.get("/get-certificate/:id", getCertificateById);
router.get("/get-all-certificates", getAllCertificates);
router.delete(
  "/delete-certificate/:id",
  hocAdminInvigilatorCheck,
  deleteCertificateById
);
router.post(
  "/upload-certificate/:id",
  uploadDocumentMulter.single("certificate"),
  uploadCertificate
);
router.post(
  "/upload-certificate-documents/:id",
  uploadDocumentMulter.fields([
    { name: "id1" },
    { name: "id2" },
    { name: "other" },
  ]),
  uploadCertificateDocuments
);
router.post(
  "/upload-certificate-videos/:id",
  userCheck,
  uploadVideoMulterStorage.fields([
    { name: "video1" },
    { name: "video2" },
    { name: "videoOther" },
  ]),
  uploadCertificateVideos
);
router.get('/send-certificate/:certificateId', hocAdminInvigilatorCheck, sendCertificateByEmail);

// notification routes
router.get("/get-all-notifications", hocAdminInvigilatorCheck, getAllNotifications);
router.get("/notifications/unread-count", getUnreadNotificationsCount);
router.patch("/notifications/:id/read", readNotification);
router.delete(
  "/delete-notification/:id",
  hocAdminInvigilatorCheck,
  deleteNotification
);

export default router;
