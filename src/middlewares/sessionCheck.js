module.exports = (req, res, next) => {
    if (!req.session.admin) {
        return next()
    } else {
    return res.redirect('/admin/presupuestos')
    }
}