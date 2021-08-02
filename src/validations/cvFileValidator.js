const fs = require("fs");

module.exports = (req, res, next) => {
  const cv = req.files[0];

  if (typeof cv !== "undefined") {

    if (cv.filename.includes(".pdf") || cv.filename.includes(".docx")) {
      return next();
    } else {
      (async () => {
        try {
          await fs.unlinkSync(cv.path);

          return res.render("index", {
            title: "inicio - Adonai",
            error: {
              cv: { msg: "Solo archivos PFD o Word" },
            }
          });

        } catch (err) {
          console.error("Error 1 al eliminar el archivo cv:", err);
        }
      })();
    }

  } else {

    return res.render("index", {
      title: "inicio - Adonai",
      old: req.body,
      error: {
        cv: {
          msg: "El CV es obligatorio"
        }
      }
    });

  }
};
