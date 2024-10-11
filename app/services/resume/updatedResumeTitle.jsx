import { GetTokens } from "@/app/actions"
import axios from "axios"
import debounce from "lodash.debounce"


export const updateResumeTitle = async ({ id, title }) => {
    const { accessToken } = await GetTokens()
    if (!id) return;
    try {
        const response = await axios.patch(`/api/updateResumeTitle/${id}`, { title }, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        
    }
}


export const debouncedUpdateResumeTitle = debounce(updateResumeTitle, 500)