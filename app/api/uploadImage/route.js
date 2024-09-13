/** @format */

import { serverInstance } from "@/lib/serverApi";

export async function POST(req) {
  try {
    const formData = await req.formData(); // Parse FormData
    const file = formData.get("image");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send the formData to the external API
    const response = await serverInstance.post(
      "/uploadimage/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Let axios handle the multipart form data
          Authorization: `Bearer careerGenie_Key`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" }, // Return JSON to the client
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data
      : { error: "Error in Uploading" };
    const statusCode = error.response ? error.response.status : 500;

    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
