// administradores.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const LibroAutores = db.define('libros_autores',{
  idautores: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  idlibros: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  }
},{
  timestamps: false
})

export default LibroAutores;