exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send('login is necessary')
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send('cannot access with login')
}