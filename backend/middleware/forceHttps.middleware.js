export const forceHttps = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.header.host + req.url);
    } else {
        next();
    }
};
