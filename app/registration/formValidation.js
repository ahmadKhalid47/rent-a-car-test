import { object, string } from "yup";

export const formValidation = object({
  username: string().trim().required("Username is required").min(6),
  password: string().trim().required("Password is required").min(6),
});

export const changePasswordValidation = object({
  OldPassword: string().trim().required("Old Password is required").min(6),
  newPassword: string().trim().required("New Password is required").min(6),
  adminPassword: string().trim().required("Admin password is required").min(6),
});

