import * as Yup from 'yup';

const prerequisiteValidationSchema = Yup.object().shape({
    type: Yup.string().required('Prerequisite type is required'),
    description: Yup.string().required("Prerequisite description is required"),
    attachmentUrl: Yup.string().url('Invalid URL').optional(),
});


const subModuleValidationSchema = Yup.object().shape({
    title: Yup.string().required('Sub-module title is required'),
    description: Yup.string().required('Sub-module description is required'),
    timeToComplete: Yup.number()
        .transform((value, originalValue) => originalValue === '' ? undefined : value)
        .required('Time to complete is required')
        .positive('Time must be a positive number')
        .integer('Time must be a whole number'),
});


const dayValidationSchema = Yup.object().shape({
    timeToComplete: Yup.number()
        .transform((value, originalValue) => originalValue === '' ? undefined : value)
        .required('Time to complete is required')
        .positive('Time must be a positive number')
        .integer('Time must be a whole number'),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    prerequisites: Yup.array().of(prerequisiteValidationSchema).optional(),
    subModules: Yup.array()
        .of(subModuleValidationSchema)
        .required('At least one sub-module is required for the day')
        .min(1, 'At least one sub-module is required for the day'),
});


export const ProgramValidationSchema = Yup.object().shape({
    title: Yup.string().required('Program title is required'),
    amount: Yup.number()
        .transform((value, originalValue) => originalValue === '' ? undefined : value)
        .required('amount is required')
        .positive('amount must be greater than $1'),
    description: Yup.string().required('Program description is required'),
    programImage: Yup.string().url('Invalid image URL').required('Program Image URL is required'),
    programVideo: Yup.string().url('Invalid video URL').optional(),
    prerequisites: Yup.array().of(prerequisiteValidationSchema).optional(),
    days: Yup.array().of(dayValidationSchema).required('At least one day is required in the program').min(1, 'At least one day is required in the program')
});
