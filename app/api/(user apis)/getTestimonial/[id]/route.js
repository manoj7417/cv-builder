import { serverInstance } from "@/lib/serverApi";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        if (!id) {
            console.log("No coach ID provided");
        }
        const response = await serverInstance.get(`/testimonial/coach/${id}`);
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
