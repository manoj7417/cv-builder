import * as Yup from "yup";

// URL validation pattern
const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

// Individual validation schemas
const prerequisiteValidationSchema = Yup.object().shape({
  type: Yup.string().required("Prerequisite type is required"),
  description: Yup.string().required("Prerequisite description is required"),
  attachmentUrl: Yup.string()
    .nullable()
    .notRequired()
    .matches(URL, { message: "Enter a valid URL", excludeEmptyString: true }),
});

const subModuleValidationSchema = Yup.object().shape({
  title: Yup.string().nullable().notRequired(),
  description: Yup.string().nullable().notRequired(),
  timeToComplete: Yup.number().nullable().notRequired(),
});

const dayValidationSchema = Yup.object().shape({
  timeToComplete: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Time to complete is required")
    .positive("Time must be a positive number")
    .integer("Time must be a whole number"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  prerequisites: Yup.array().of(prerequisiteValidationSchema).optional(),
  subModules: Yup.array().of(subModuleValidationSchema).optional(),
});

// Program validation schema
export const ProgramValidationSchema = Yup.object().shape({
  title: Yup.string().required("Program title is required"),
  amount: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Amount is required")
    .positive("Amount must be greater than $1"),
  description: Yup.string().required("Program description is required"),
  programImage: Yup.string()
    .matches(URL, "Enter a valid URL")
    .required("Program Image URL is required"),
  programVideo: Yup.string()
    .nullable()
    .notRequired()
    .matches(URL, { message: "Enter a valid URL", excludeEmptyString: true }),
  prerequisites: Yup.array().of(prerequisiteValidationSchema).optional(),
  days: Yup.array()
    .of(dayValidationSchema)
    .required("At least one day is required in the program")
    .min(1, "At least one day is required in the program"),
});
