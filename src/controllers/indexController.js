const db = require("../database/models")
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
    home: (req,res) => {
        res.render('index', {
            title: "inicio - Adonai"
        })
    },
    services: (req,res) => {

        db.Budgets.findAll()

        .then(budgets => {
            //res.send(budgets)
           
            return res.render('services', {
                title: "Abonos y servicios - Adonai",
                budgets
            })
        })
        .catch(error => res.send(error))

    },
    login: (req,res) => {
        res.render('login', {
            title: "Ingresar - Adonai"
        })
    },
    loginProcess:(req,res) => {
        let errores = validationResult(req);
        
        if (!(errores.isEmpty())) {
            return res.render('login', {
                title: "Ingresar - Adonai",
                errores: errores.mapped(),
                old: req.body
            })
        }


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
            
            
            if (!(bcrypt.compareSync(password, admin.password)) || password === "") {
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
            } else {
                  /* creo session */
                  req.session.admin = {
                    id: admin.id,
                    email: admin.email
                }
                /* creo cookie */
                res.cookie('Adonai', req.session.admin, {
                    maxAge: 1000 * 60 * 60 * 24 * 7 /*La cookie vive por una semana*/
                })

                return res.redirect("/admin/presupuestos")
            }

        })
    },
    logout: (req,res) => {
        /* borro la session */
        delete req.session.admin
        /* Borro la cookie */
        res.cookie('adonai', '', { maxAge: -1 });

        res.redirect('/')
    }
}