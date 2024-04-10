// libro_categoria.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const LibroCategoria = db.define('libro_categorias',{
  id_libros: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  id_categorias: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  }
},{
  timestamps: false
})

export default LibroCategoria;