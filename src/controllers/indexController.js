

module.exports = {
    home: (req,res) => {
        res.render('index', {
            title: "inicio - Adonai"
        })
    },
    services: (req,res) => {
        res.render('services', {
            title: "Abonos y servicios - Adonai"
        })
    },
    login: (req,res) => {
        res.render('login', {
            title: "Ingresar - Adonai"
        })
    }
}