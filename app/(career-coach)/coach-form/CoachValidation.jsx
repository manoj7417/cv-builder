/** @format */

import * as yup from "yup";


export const schema = yup.object().shape({
  profileImage: yup.string().required("Profile image is required"),
  name: yup.string().min(1, "Full name is required"),
  email: yup
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  dateofBirth: yup.string().required("Date of Birth is required"),
  placeofBirth: yup.string().required("Place of Birth is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().min(1, "Country is required"),
  city: yup.string().min(1, "City is required"),
  zip: yup.string().min(1, "zip is required"),
  experience: yup.number().typeError("Experience must be a number").required("Experience is required").min(1, "Experience must be at least 1 year"),
  bio: yup.string().min(1, "Bio is required"),
  coachingDescription: yup.string().min(1, "Coaching Description is required"),
  // socialPlatform:yup.string().required("Social Platform is required"),
  // linkUrl:yup.string().required("Link URL is required"),
  skills: yup.string().required("Skills is required"),
  typeOfCoaching: yup.string().required("Type of Coaching is required"),
  bankName: yup.string().required("Bank Name is required"),
  ifscCode: yup.string().required("IFSC Code is required"),
  bankAccountNumber: yup.string().required("Bank Account Number is required"),
  // charges: yup.number().typeError("Charges must be a number").required("Price is required").min(1, "charges must not be less than $1/hr"),
  cvUpload: yup.string().required("CV is required"),
  docsUpload: yup.string().required("Signed Aggrement Document is required"),
});
