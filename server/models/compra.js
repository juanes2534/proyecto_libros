// compras.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const Compras = db.define('compras',{
  cedula_usuario: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  idlibros: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  fecha_compra:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
},{
  timestamps: false
})

export default Compras;