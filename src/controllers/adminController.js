
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
}
