import { serverInstance } from "@/lib/serverApi";

export async function GET(req, { params }) {
    try {
        const { coachId } = params;
        const response = await serverInstance.get(`/testimonial/coach/${coachId}`);
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {

        const errorMessage = error.response
            ? error.response.data
            : { error: "Error getting program" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { "Content-Type": "application/json" },
        });
    }
}
