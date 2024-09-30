import { GetTokens } from "@/app/actions"
import { instance } from "@/app/api/api"
import debounce from "lodash.debounce"


export const updateResumeTitle = async ({ id, title }) => {
    const { accessToken } = await GetTokens()
    if (!id) return;
    try {
        const response = await instance.patch(`/resume/updateTitle/${id}`, { title }, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}


export const debouncedUpdateResumeTitle = debounce(updateResumeTitle, 500)