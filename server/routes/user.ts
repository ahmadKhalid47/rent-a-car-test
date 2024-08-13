import express from "express";
import multer from "multer";
import { userOnlineForm, getOnlineFormUrl } from "../controllers/user.controller";
import { addStudentValidator } from "../validators/admin";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

router.get("/get-form-status/:uniqueUrl", getOnlineFormUrl);
router.post(
  "/online-form/:uniqueUrl",
  upload.fields([
    { name: "avatar" },
    { name: "certificate" },
    { name: "id1Image" },
    { name: "id2Image" },
    { name: "id2Image2" },
    { name: "id3Image" },
    { name: "id3Image2" },
  ]),
  addStudentValidator,
  userOnlineForm
);

export default router;
