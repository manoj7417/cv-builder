import { serverInstance } from "@/lib/serverApi";

export async function PATCH(req, res) {
    try {
        const token = req.headers.get("Authorization");
        const data = await req.json();
        const response = await serverInstance.patch(
            `/coach/updateDateOverrides`,
            data,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        const errorMessage = error.response
            ? error.response.data
            : { error: "Error updating date override" };
        const statusCode = error.response ? error.response.status : 500;
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { "Content-Type": "application/json" },
        });
    }
}