module.exports = (req, res, next) => {
    if(req.cookies.adonai){
        req.session.admin = req.cookies.adonai;
    }
    next()
}