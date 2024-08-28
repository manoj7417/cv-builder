import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "x-api-key": apiKey,
    "Content-Type": "application/json"
  },
});

export const updateUserProfile = async (data, token) => {
  try {
    const response = await instance.patch('/user/update/userprofiledetails', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Error updating user:", error.response || error);
    throw error;
  }
}

export const getCareerCounselling = async (data, token) => {
  try {
    const response = await instance.post('/openai/generateCounsellingTest', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }
  catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}


export const generateCareerAdvice = async (data, token) => {
  try {
    const response = await instance.post('/openai/generateCareerAdvice', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }
  catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}



export const usertemplatepurchase = async (data) => {
  try {
    const response = await instance.post('/user/templatepurchase', data, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}

export const Payment = async (data, token) => {
  try {
    const response = await instance.post("/stripe/create-checkout-session", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
};

export const AnalyzeAts = async (message, token) => {
  try {
    const response = await instance.post("/openai/atsCheck", { message }, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AskBot = async (message) => {
  try {
    const response = await instance.post("/openai/askBot", { message });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await instance.post("/user/login", data, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
}


export const registerUser = async (data) => {
  try {
    const response = await instance.post("/user/register", data, {
      withCredentials: true
    });
    return response
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await instance.post('/user/forgetPassword', { email })
    return response
  } catch (error) {
    console.log("Error sending reset password link", error)
    throw error;
  }
}

export const resetPassword = async (payload) => {
  try {
    const response = await instance.post('/user/resetPassword', payload)
    return response;
  } catch (error) {
    console.log("Error reseting password", error)
    throw error;
  }
}

export const getBetterResume = async (message) => {
  try {
    const response = await instance.post('/openai/generateBetterResume', { message }, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    return error
  }
}

export const generateResumeOnFeeback = async (analysisId, type, token) => {
  try {
    const response = await instance.post('/openai/generateResumeOnFeeback', { analysisId, type }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Error generating feedback:", error.response || error);
    throw error
  }
}

export const printResume = async (html, token) => {
  try {
    const response = await fetch(`${baseURL}/api/print/resume`, {
      method: "POST",
      body: JSON.stringify(html),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Authorization': `Bearer ${token}`
      }
    }
    )
    return response;
  } catch (error) {
    throw error
  }
}


export const uploadImage = async (formData) => {
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dqsalbg0o/image/upload', formData)
    return response;
  } catch (error) {
    throw error
  }
}

export const getUserResume = async () => {
  try {
    const response = await instance.get('/user/resume', { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}

export const getUserResumes = async (token) => {
  try {
    const response = await instance.get('/resume/allResume', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error getting user:", error.response || error);
    throw error
  }
}

export const createNewResume = async (token, template) => {
  try {
    const response = await instance.post('/resume/create', { template }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Error creating resume:", error.response || error);
    throw error
  }
}

export const deleteUserResume = async (id, token) => {
  try {
    const response = await instance.delete(`/resume/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.error("Error deleting resume:", error.response || error);
    throw error
  }
}

export const PurchaseTokens = async (token) => {
  try {
    const response = await instance.post("/user/creditsPurchase", '', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const uploadProfilePicture = async (formdata, token) => {
  try {
    const response = await instance.post('/user/upload/profile', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
}

export const createNewJobProfileResume = async (token, resumeData) => {
  try {
    const response = await instance.post("/resume/jobResume", { data: resumeData }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating job resume", error.response || error);
    throw error;
  }
}

export const sendSubscribeEmail = async (data) => {
  try {
    const response = await axios.post('https://sea-turtle-app-sm5l4.ondigitalocean.app/api/sendMail/career-genie', data)
    return response;
  } catch (error) {
    throw error;
  }
}

export const UpgradePricing = async (data, token) => {
  try {
    const response = await instance.post('/stripe/createSubscription', data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer  ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
}




export const generateFreshResume = async (message, type, token) => {
  try {
    const response = await instance.post('/openai/generateFreshResume', { message, type }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
}