
const StripProtocol = (url) => {
    return url.replace(/^https?:\/\//i, '');
};

export default StripProtocol;