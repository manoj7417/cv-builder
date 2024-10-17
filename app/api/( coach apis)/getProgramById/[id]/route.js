
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const token = req.headers.get('Authorization')
        const response = await serverInstance.get(`/coach/programByProgramId/${id}`, {
            headers: {
                Authorization: token
            }
        })
        return new Response(JSON.stringify(response.data), {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error getting program" }
        const statusCode = error.response ? error.response.status : 500
        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}