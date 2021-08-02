const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const fs = require("fs");

module.exports = {
  home: (req, res) => {
    res.render("index", {
      title: "inicio - Adonai",
    });
  },

  cvProcess: (req, res, next) => {
    const cv = req.files[0];
    let errores = validationResult(req);

    if (!errores.isEmpty()) {

      (async () => {
        try {
          await fs.unlinkSync(cv.path)

          return res.render("index", {
            title: "inicio - Adonai",
            errores: errores.mapped(),
            old: req.body
        });
          
        } catch(err) {
          console.error('Error 2 al eliminar el archivo cv:', err)
        }
      })()

    } else {
      let { fullName, tel, district, email, message } = req.body;

      let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
          ciphers: "SSLv3",
        },
        auth: {
          user: process.env.EMISOR_EMAIL, //email emisor, preferentemente outlook
          pass: process.env.PASS_EMAIL, //contraseña de email emisor
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: fullName,
        to: "gabriel_45_96@outlook.com", //email reseptor, preferentemente outlook
        subject: "CV de Adonai",
        text: `
      Remitente
        Nombre completo: ${fullName}
        Teléfono: ${tel}
        Localidad: ${district}
        Email: ${email}
        Mensaje: 
            ${message}`,
        attachments: [
          {
            filename: cv.originalname,
            path: cv.path,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("algo salio mal !!!!!!!!!!!");
          res.status(500).send(error.message)(async () => {
            try {
              await fs.unlinkSync(cv.path);

              return res.render("index", {
                title: "inicio - Adonai",
                errores: errores.mapped(),
                old: req.body,
                cvError: "error", //crear condicion y cartel de error al enviar consulta
              });
            } catch (err) {
              console.error("Error 3 al eliminar el archivo cv:", err);
            }
          })();
        } else {
          console.log("Email enviado !!!!!!!!!!");
          /* res.status(200).jsonp(req.body); */
          console.log(cv);
          (async () => {
            try {
              await fs.unlinkSync(cv.path); //(__dirname + '/../../public/files/' + cv.filename)//no encuentra el archivo en esta ruta

              return res.render("index", {
                title: "inicio - Adonai",
                cvSuccess: "Success", //crear condicion y cartel de éxito al enviar consulta
              });
            } catch (err) {
              console.error("Error 4 al eliminar el archivo cv:", err);
            }
          })();
        }
      });
    }
  },

  services: (req, res) => {
    db.Budgets.findAll()

      .then((budgets) => {
        //res.send(budgets)

        return res.render("services", {
          title: "Abonos y servicios - Adonai",
          budgets,
        });
      })
      .catch((error) => res.send(error));
  },

  consult: (req, res) => {
    let errores = validationResult(req);

    if (!errores.isEmpty()) {
      db.Budgets.findAll()

        .then((budgets) => {
          return res.render("services", {
            title: "Abonos y servicios - Adonai",
            errores: errores.mapped(),
            budgets,
            old: req.body,
          });
        })
        .catch((error) => res.send(error));
    } else {
      let { fullName, tel, email, message } = req.body;

      let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
          ciphers: "SSLv3",
        },
        auth: {
          user: process.env.EMISOR_EMAIL, //email emisor, preferentemente outlook
          pass: process.env.PASS_EMAIL, //contraseña de email emisor
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: fullName,
        to: "gabriel_45_96@outlook.com", //email receptor, preferentemente outlook
        subject: "Consulta de Adonai",
        text: `Remitente
            Nombre completo: ${fullName}
            Teléfono: ${tel}
            Email: ${email}
            Mensaje: 
            ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          /* console.log("algo salio mal !!!!!!!!!!!");
                res.status(500).send(error.message) */

          db.Budgets.findAll()

            .then((budgets) => {
              return res.render("services", {
                title: "Abonos y servicios - Adonai",
                budgets,
                old: req.body,
                consultingError: "error", //crear condicion y cartel de error al enviar consulta
              });
            })
            .catch((error) => res.send(error));
        } else {
          /* console.log("Email enviado !!!!!!!!!!");
        res.status(200).jsonp(req.body); */

          db.Budgets.findAll()

            .then((budgets) => {
              return res.render("services", {
                title: "Abonos y servicios - Adonai",
                budgets,
                consultingSuccess: "Success", //crear condicion y cartel de éxito al enviar consulta
              });
            })
            .catch((error) => res.send(error));
        }
      });
    }
  },

  login: (req, res) => {
    res.render("login", {
      title: "Ingresar - Adonai",
    });
  },

  loginProcess: (req, res) => {
    let errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("login", {
        title: "Ingresar - Adonai",
        errores: errores.mapped(),
        old: req.body,
      });
    }

    const { email, password } = req.body;

    db.Admin.findOne({
      where: {
        email: email.trim(),
      },
    }).then((admin) => {
      if (!admin) {
        return res.render("login", {
          title: "Ingresar - Adonai",
          errores: {
            email: { msg: "Dirección de correo electrónico no registrada" },
          },
          old: req.body,
          emailInvalid: "validación negativa",
        });
      }

      if (!bcrypt.compareSync(password, admin.password) || password === "") {
        return res.render("login", {
          title: "Ingresar - Adonai",
          errores: {
            password: {
              msg: "Contraseña incorrecta",
            },
          },
          old: req.body,
          emailValid: "validacion positiva",
          passInvalid: "validacion negativa",
        });
      } else {
        /* creo session */
        req.session.admin = {
          id: admin.id,
          email: admin.email,
        };
        /* creo cookie */
        res.cookie("Adonai", req.session.admin, {
          maxAge: 1000 * 60 * 60 * 24 * 7 /*La cookie vive por una semana*/,
        });

        return res.redirect("/admin/presupuestos");
      }
    });
  },

  logout: (req, res) => {
    /* borro la session */
    delete req.session.admin;
    /* Borro la cookie */
    res.cookie("adonai", "", { maxAge: -1 });

    res.redirect("/");
  },
};
