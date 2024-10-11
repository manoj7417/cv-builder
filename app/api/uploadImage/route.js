import { serverInstance } from '@/lib/serverApi';

export async function POST(req, res) {
    try {
        const formData = await req.formData();
        const response = await serverInstance.post('/uploadimage/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : { error: "Error uploading image" };
        const statusCode = error.response ? error.response.status : 500;

        return new Response(JSON.stringify(errorMessage), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
