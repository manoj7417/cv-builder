import { GetTokens } from "@/app/actions"
import { instance } from "@/app/pages/api/api"
import debounce from "lodash.debounce"


export const updateResume = async (data) => {
    const { accessToken } = await GetTokens()
    if (!data._id) return;
    try {
        const response = await instance.patch(`/resume/update/${data._id}`, { data: data.data }, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}



export const debouncedUpdateResume = debounce(updateResume, 500)