// associations.js
import Administradores from "./administrador.js"
import Categorias from "./categoria.js"
import Compras from "./compra.js"
import LibroCategorias from "./libro_categoria.js"
import Libros from "./libro.js"
import Usuarios from "./usuario.js"
// Asociaciones

Administradores.hasMany(Libros, {foreignKey: 'administradores_cedula'})

Libros.belongsTo(Administradores,{foreignKey: 'administradores_cedula'})

Libros.belongsToMany(Categorias, {through: LibroCategorias, foreignKey: 'id_libros'})

Categorias.belongsToMany(Libros, {through: LibroCategorias, foreignKey: 'id_categorias'})

Usuarios.belongsToMany(Libros, {through: Compras, foreignKey: 'cedula_usuario'})

Libros.belongsToMany(Usuarios, {through: Compras, foreignKey: 'idlibros'})

export {
  Administradores,
  Categorias,
  Compras,
  LibroCategorias,
  Libros,
  Usuarios
};
