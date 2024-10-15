import * as Yup from "yup";

export const ProgramValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    prerequisites: Yup.array()
        .of(
            Yup.object().shape({
                type: Yup.string().required('Prerequisite type is required'),
                description: Yup.string().required('Prerequisite description is required'),
                attachmentUrl: Yup.string().url('Invalid URL').required('Attachment URL is required'),
            })
        )
        .optional(),
    days: Yup.array()
        .of(
            Yup.object().shape({
                timeToComplete: Yup.string().required('Completion time is required'),
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                prerequisites: Yup.array()
                    .of(
                        Yup.object().shape({
                            type: Yup.string().required('Prerequisite type is required'),
                            description: Yup.string().required('Prerequisite description is required'),
                            attachmentUrl: Yup.string().url('Invalid URL').required('Attachment URL is required'),
                        })
                    )
                    .optional()
            })
        )
        .optional(),
})