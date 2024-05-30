import { instance } from "@/app/pages/api/api"
import debounce from "lodash.debounce"


export const updateResume = async (data) => {
    try {
        const response = await instance.patch(`/resume/update/${data._id}`, { data: data.data }, { withCredentials: true })
    } catch (error) {
        console.log(error)
    }
}



export const debouncedUpdateResume = debounce(updateResume, 500)