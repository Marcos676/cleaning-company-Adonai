const bcript = require("bcryptjs")

module.exports = {
    show: (req,res) => {
        res.render('./admin/budgetsList', {
            title: "Lista de presupuestos"
        })
    },
    create: (req,res) => {
        res.render('./admin/budgetCreate', {
            title: "Crear presupuesto"
        })
    },
    edit: (req,res) => {
        res.render('./admin/budgetEdit', {
            title: "Editar presupuesto"
        })
    },
    passChange: (req,res) => {    
        res.render('./admin/passChange', {
            title: "Cambiar contraseña"
        })
    },
    passChangeProcess: (req,res) => {
        const { pass, newPass, repeatPass } = req.body;

        db.Admin.findOne({
            where: {
                id: req.session.admin.id
            }
        })

        .then(admin => {
            /* Si no llena ningún campo, redirige */
            if ( (pass.length === 0) && (newPass.length === 0) && (repeatPass === 0) ) {
                res.redirect('/admin/presupuestos')
            }

            /* Si la contraseña es incorrecta, muestro error */
            if (!bcrypt.compareSync(pass.trim(), admin.pass)) {

                return res.render('/admin/cambiar-contraseña', {
                    title: "Cambiar contraseña",
                    errores: {
                        password: { msg: "Contraseña incorrecta" }
                    },
                    old: req.body
                })
                //DEBO COMPLETAR LAS VALIDACIONES DESDE EL EJS Y CONTINUAR EVALUANDO SITUACIONES

            } else {
                
            }
        })
    }
}