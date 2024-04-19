// libro.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const Libros = db.define('libros',{
  idlibros: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  imagen:{
    type: DataTypes.STRING(300),
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  autor:{
    type: DataTypes.STRING(60),
    allowNull: false
  },
  descripcion:{
    type: DataTypes.STRING(700),
    allowNull: false
  },
  editorial:{
    type: DataTypes.STRING(70),
    allowNull: false
  },
  categoria:{
    type: DataTypes.STRING(100),
    allowNull: false
  },
  precio:{
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  archivo_pdf:{
    type: DataTypes.STRING(300),
    allowNull: false
  },
  fecha_publicacion:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  administradores_cedula:{
    type: DataTypes.INTEGER(11),
    allowNull: false
  }
},{
  timestamps: false
})

export default Libros;