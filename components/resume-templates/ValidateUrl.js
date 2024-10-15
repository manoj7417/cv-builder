const stripProtocol = (url) => {
    if (typeof url !== 'string') {
        return url; 
    }
    return url.replace(/^https?:\/\//i, ''); 
};

export const isValidUrl = (url) => {
    const strippedUrl = stripProtocol(url);
    return strippedUrl?.length > 0;
};