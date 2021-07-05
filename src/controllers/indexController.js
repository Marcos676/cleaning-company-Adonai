const db = require("../database/models")
const bcrypt = require('bcryptjs');

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
    },
    loginProcess:(req,res) => {
        const { email, password } = req.body

        db.Admin.findOne({
            where: {
                email: email.trim()
            }
        })
        .then(admin => {
            if (!admin) {
                return res.render('login', {
                    title: "Ingresar - Adonai",
                    errores: {
                        email: { msg: 'Dirección de correo electrónico no registrada' }
                    },
                    old: req.body,
                  emailInvalid: 'validación negativa'  
                })
            } 
            
            
            if (bcrypt.compareSync(password, admin.password)) {
                /* creo session */
                req.session.admin = {
                    id: admin.id,
                    email: admin.email
                }

                return res.redirect("/admin/presupuestos")

            } else {
                return res.render('login', {
                    title: "Ingresar - Adonai",
                    errores: {
                        password: {
                            msg: "Contraseña incorrecta"
                        }
                    },
                    old: req.body,
                    emailValid: 'validacion positiva',
                    passInvalid: 'validacion negativa'
                })
            }

        })
    },
    logout: (req,res) => {
        delete req.session.admin
        res.redirect('/')
    }
}