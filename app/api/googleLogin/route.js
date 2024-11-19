import { serverInstance } from "@/lib/serverApi";

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return new Response(
        JSON.stringify({ error: "ID token is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Forward the request to the backend API
    const response = await serverInstance.post("/user/googleLogin", { idToken });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in Google Login API:", error);
    const errorMessage = error.response
      ? error.response.data
      : { error: "Error processing Google login" };
    const statusCode = error.response ? error.response.status : 500;

    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
