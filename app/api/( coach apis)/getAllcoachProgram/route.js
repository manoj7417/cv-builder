import { serverInstance } from "@/lib/serverApi";
export async function GET(req) {
    try {
        const token = req.headers.get("Authorization");
        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        const response = await serverInstance.get(`/coach/getAllcoachPrograms`, {
            headers: {
                Authorization: token,
            },
        });

        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
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
