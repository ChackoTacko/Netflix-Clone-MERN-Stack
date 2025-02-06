export const forceHttps = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.hostname + req.url);
    } else {
        next();
    }
};
