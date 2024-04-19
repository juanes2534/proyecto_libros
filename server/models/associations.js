// associations.js
import Administradores from "./administrador.js"
import Categorias from "./categoria.js"
import Compras from "./compra.js"
import Libros from "./libro.js"
import Usuarios from "./usuario.js"
// Asociaciones

Administradores.hasMany(Libros, {foreignKey: 'administradores_cedula'})

Libros.belongsTo(Administradores,{foreignKey: 'administradores_cedula'})

Usuarios.belongsToMany(Libros, {through: Compras, foreignKey: 'cedula_usuario'})

Libros.belongsToMany(Usuarios, {through: Compras, foreignKey: 'idlibros'})

export {
  Administradores,
  Categorias,
  Compras,
  Libros,
  Usuarios
};
