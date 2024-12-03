import { serverInstance } from "@/lib/serverApi";

export async function POST(req) {
    try {
        const data = await req.json();

        const response = await serverInstance.post("/coach/googleLogin", data);

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