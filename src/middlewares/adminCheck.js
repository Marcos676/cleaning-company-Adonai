module.exports = (req,res,next) => {
    let admin = req.session.admin
    typeof admin != "undefined"? next() : res.redirect("/ingresar")
}