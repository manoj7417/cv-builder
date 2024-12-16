import { serverInstance } from '@/lib/serverApi';
import { toast } from 'react-toastify';

export async function POST(req, res) {
    try {
        const { data } = await req.json();
        const token = req.headers.get('Authorization');
        const response = await serverInstance.post('/stripe/createSubscription', data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
      
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) { 
    
        return new Response(JSON.stringify({ error: error.response.data.error }), {
            status: error.response.status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
