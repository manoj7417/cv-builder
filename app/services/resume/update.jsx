import { GetTokens } from "@/app/actions"
import axios from "axios";
import debounce from "lodash.debounce"


export const updateResume = async (data) => {
    const { accessToken } = await GetTokens()
    if (!data._id) return;
    try {
        const response = await axios.patch(`/api/updateResume/${data._id}`, { data: data.data }, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        
    }
}

export const debouncedUpdateResume = debounce(updateResume, 500)