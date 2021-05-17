const Usuarios = require("../models/Usuarios");

// ==========================================
// Crear un nuevo usuario: POST - /usuario Body: name
// ==========================================
exports.registrarUsuario = async (req, res) => {
  const body = req.body;
  // Verificar que se envie los campos obligatorios (nombre, email, password)
  if (!body.name) {
    // Accion prohibida. (Error)
    return res.status(403).json({
      ok: false,
      mensaje: "Faltan campos obligatorios. Revisar el name.",
    });
  } else {
    // Hay datos, crear el objeto usuarios.
    const usuario = new Usuarios({
      name: body.name,
    });
    usuario.save((err, usuarioGuardado) => {
      // Si hay algun otro error entonces mostrarlo al usuario
      if (err) {
        // 400 Bad request.
        return res.status(400).json({
          ok: false,
          mensaje: "Error al crear usuario",
          errors: err,
        });
      }
      // Todo bien. 201 creado
      res.status(201).json({
        ok: true,
        usuario: usuarioGuardado,
      });
    });
  }
};

// Encontra todos los usuarios
exports.mostrarUsuarios = async (req, res, next) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);
  // Encontra todos los usuarios.
  Usuarios.find({}, "name") // valores que me interesa obtener.
    .skip(desde)
    .limit(5) // Envia/Muestra  5 registros
    .exec((err, usuarios) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando usuarios",
          errors: err,
        });
      }
      Usuarios.countDocuments({}, (err2, conteo) => {
        if (err2) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error contando los usuarios",
            errors: err2,
          });
        }
        res.status(200).json({
          ok: true,
          total: conteo,
          usuarios,
        });
      });
    });
};

// Borra un usuario por su id: DELETE /usuario/:id
exports.borrarUsuario = async (req, res, next) => {
  const id = req.params.id;
  // Verificar que el id no este vacio
  if (!id) {
    // Accion prohibida. (Error)
    return res.status(403).json({
      ok: false,
      mensaje: "El id es obligatorio",
    });
  } else {
    // Existe el id, intentar borrar el usuario.
    Usuarios.findByIdAndRemove(id, (err, usuarioBorrado) => {
      // Si hay algun error del servidor
      if (err) {
        // 500 Internal Server Error
        return res.status(500).json({
          ok: false,
          mensaje: "Error al borrar el usuario",
          errors: err,
        });
      }
      // Si no existe el usuario a buscar.
      if (!usuarioBorrado) {
        // 500 Internal Server Error
        return res.status(400).json({
          ok: false,
          mensaje: "No existe un usuario con ese ID",
          errors: {
            message: "No existe un usuario con ese ID",
          },
        });
      }
      // Todo bien usuario borrado.
      res.status(200).json({
        ok: true,
        usuario: usuarioBorrado,
      });
    });
  }
};

//Muestra un cliente por su id
exports.showUserById = async (req, res, next) => {
  const id = req.params.id;
  // Verificar que el id no este vacio
  if (!id) {
    // Accion prohibida. (Error)
    return res.status(403).json({
      ok: false,
      mensaje: "El id es obligatorio",
    });
  } else {
    const cliente = await Usuarios.findById(req.params.id);

    if (!cliente) {
      res.json({ mensaje: "Ese cliente no existe" });
      next();
    }
    //Mostrar el cliente.
    return res.status(200).json({
        ok: true, 
        cliente
      });
  }
};
