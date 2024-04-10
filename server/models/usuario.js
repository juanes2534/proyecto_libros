// usuario.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const Usuarios = db.define('usuarios',{
  cedula: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  usuario: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  nombres:{
    type: DataTypes.STRING(45),
    allowNull: false
  },
  apellidos:{
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email:{
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  },
  contrasena:{
    type: DataTypes.STRING(200),
    allowNull: false
  },
  fecha_registro:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
},{
  timestamps: false
})

export default Usuarios;