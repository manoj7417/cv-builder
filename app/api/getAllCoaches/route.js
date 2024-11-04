import { serverInstance } from "@/lib/serverApi";

export async function GET(req, res) {
    try {
        const response = await serverInstance.get('/coach/all');
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log('Error in /api/getAllCoaches:', error.message); // Detailed logging
        const errorMessage = error.response ? error.response.data : { error: "An error occurred in fetching coaches" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
