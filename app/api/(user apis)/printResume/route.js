import { serverInstance } from "@/lib/serverApi";

export async function POST(req) {
    try {
        // Parse incoming JSON request body
        const { html } = await req.json();
        const token = await req.headers.get('Authorization')
        if (!html) {
            return new Response(JSON.stringify({ message: "No HTML provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const response = await serverInstance.post(
            "/print/resume",
            { html },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer",
            }
        );
        console.log(response.data)
        return new Response(response.data, {
            status: response.status || 200,
            headers: {
                "Content-Type": "application/pdf"
            },
        });
    } catch (error) {
        const errorMessage = error.response
            ? error.response.data
            : { error: "Error generating or downloading the PDF" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { "Content-Type": "application/json" },
        });
    }
}
