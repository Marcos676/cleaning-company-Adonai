const db = require("../database/models")
const bcrypt = require("bcryptjs")
const { validationResult } = require('express-validator');


module.exports = {
    show: (req,res) => {

        db.Budgets.findAll()

        .then(budgets => {
            //res.send(budgets)
           
            return res.render('./admin/budgetsList', {
                title: "Lista de presupuestos",
                budgets
            })
        })
        .catch(error => res.send(error))
      
    },
    create: (req,res) => {
        res.render('./admin/budgetCreate', {
            title: "Crear presupuesto"
        })
    },
    createProcess: (req,res) => {
        let errores = validationResult(req);
        
        if (!(errores.isEmpty())) {
            return res.render('./admin/budgetCreate', {
                title: "Crear presupuesto",
                errores: errores.mapped(),
                old: req.body
            })
        }
    
        let {name, price, week, hours, iva, materials} = req.body

        db.Budgets.create({
            name,
            price: +price,
            week: +week,
            hours: +hours,
            iva: +iva,
            materials: +materials
        })
        .then( () => {
            return res.redirect('/admin/presupuestos')
        })
        .catch(error => res.send(error))

    },
    edit: (req,res) => {

        db.Budgets.findOne({
            where: {
                id: req.params.id
            }
        })

        .then( budget => {
            
            return  res.render('./admin/budgetEdit', {
                title: "Editar presupuesto",
                budget
            })
        })

        .catch(error => res.send(error))


    },
    editProcess: (req,res) => {
        let errores = validationResult(req);
        
        if (!(errores.isEmpty())) {
            
            db.Budgets.findOne({
                where: {
                    id: req.params.id
                }
            })
    
            .then( budget => {
                
                return  res.render('./admin/budgetEdit', {
                    title: "Editar presupuesto",
                    errores: errores.mapped(),
                    old: req.body,
                    budget
                })
            })
    
            .catch(error => res.send(error))
        }

        let {name, price, week, hours, iva, materials} = req.body

        db.Budgets.update({
            name,
            price: +price,
            week: +week,
            hours: +hours,
            iva: +iva,
            materials: +materials
        },
        {
            where: {
                id: req.params.id
            }
        })

        .then( () => {
            return res.redirect('/admin/presupuestos')
        })
        .catch(error => res.send(error))

    },
    budgetDelete: (req,res) => {
        db.Budgets.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            return res.redirect('/admin/presupuestos')
        })
        .catch(error => res.send(error))
    },
    passChange: (req,res) => {    
        res.render('./admin/passChange', {
            title: "Cambiar contraseña"
        })
    },
    passChangeProcess: (req,res) => {
        let errores = validationResult(req);
        
        if (!(errores.isEmpty())) {
            return res.render('./admin/passChange', {
                title: "Cambiar contraseña",
                errores: errores.mapped()
            })
        }

        const { pass, newPass, repeatPass } = req.body;

        /* Si no llena ningún campo, redirige */
        if ( (pass === "") && (newPass === "") && (repeatPass === "") ) {
            res.redirect('/admin/presupuestos')
        }

        db.Admin.findOne({
            where: {
                id: req.session.admin.id
            }
        })

        .then(admin => {

        
            /* Si la contraseña es incorrecta, muestra error */
            if (!(bcrypt.compareSync(pass.trim(), admin.password))) {

                return res.render('./admin/passChange', {
                    title: "Cambiar contraseña",
                    errores: {
                        pass: { msg: "Contraseña incorrecta" }
                    }
                })
            } 
           

            const newPassword = bcrypt.hashSync(newPass, 12);

            db.Admin.update({
                id: req.session.admin.id,
                email:req.session.admin.email,
                password: newPassword,
            }, {
                where: { id: req.session.admin.id }
            })
            

        })

        .then( () => {
            res.redirect('/admin/presupuestos')
        })

        .catch(error => res.send(error))
    }
}