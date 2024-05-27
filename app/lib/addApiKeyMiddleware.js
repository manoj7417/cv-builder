const addApiKeyMiddleware = (handler) => async (req, res) => {
    try {
        req.headers['x-api-key'] = process.env.API_KEY;
        return handler(req, res);
    } catch (error) {
        console.error('Error in API key middleware:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default addApiKeyMiddleware;
