/** @format */
import { serverInstance } from "@/lib/serverApi";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Ensure that the token is present


    // Make the GET request to your server instance
    const response = await serverInstance.get(`/coach/programByCoachId/${id}`);

    return new Response(JSON.stringify(response.data), {
      status: response.status || 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle potential errors
    const errorMessage = error.response
      ? error.response.data
      : { error: "Error fetching program data" };
    const statusCode = error.response ? error.response.status : 500;

    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
