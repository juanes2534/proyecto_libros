// libro.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const Libros = db.define('libros',{
  idlibros: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  descripcion:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  editorial:{
    type: DataTypes.STRING(70),
    allowNull: false
  },
  precio:{
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  archivo_pdf:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fecha_publicacion:{
    type: DataTypes.DATE,
    allowNull: false
  },
  administradores_cedula:{
    type: DataTypes.INTEGER(11),
    allowNull: false
  }
},{
  timestamps: false
})

export default Libros;