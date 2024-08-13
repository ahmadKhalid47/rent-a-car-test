import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import Course from "../models/course";

declare global {
  namespace Express {
    interface Request {
      userId: string | undefined;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["token"];

  if (!token) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = (decodedToken as JwtPayload).id;

    next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const hocAdminInvigilatorCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["token"];

  if (!token) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.userId = (decodedToken as JwtPayload).id;

    let userData;
    if (req.userId) {
      userData = await User.findById(req.userId);
    }
    if (!userData) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    if (userData?.role !== "hoc" && userData?.role !== "admin" && userData?.role !== "invigilator") {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const userCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["token"];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.userId = (decodedToken as JwtPayload).id;

    let userData;
    if (req.userId) {
      userData = await User.findById(req.userId);
    }
    if (!userData) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const iqaCourseAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["token"];

  if (!token) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  const courseId: string = req.params.courseId;
  // const userId = req.user.id;

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.userId = (decodedToken as JwtPayload).id;

    let userData;
    if (req.userId) {
      userData = await User.findById(req.userId);
    }

    if (!userData) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    if (userData.role !== "iqa") {
      return next(
        new ErrorHandler("Not authorized to access this course", 403)
      );
    }

    const courseData = await Course.findById(courseId);

    if (!courseData?.iqaAssigned.includes(userData._id)) {
      return next(
        new ErrorHandler("Not authorized to access this course", 403)
      );
    }

    // if (
    //   userData.role !== "iqa" ||
    //   !userData.assignedCourses.includes(new mongoose.Types.ObjectId(courseId))
    // ) {
    //   return next(
    //     new ErrorHandler("Not authorized to access this course", 403)
    //   );
    // }

    next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

// export const iqaCourseAccess = catchAsyncErrors(async (req, res, next) => {
//   const { courseId } = req.params;
//   const userId = req.user.id; // Assuming `req.user` is set from a previous auth middleware

//   const user = await User.findById(userId);
//   if (user.role !== 'iqa' || !user.assignedCourses.includes(courseId)) {
//     return next(new ErrorHandler("Not authorized to access this course", 403));
//   }

//   next();
// });
