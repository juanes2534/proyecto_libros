// administradores.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const Autores = db.define('autores',{
  idautores: {
    type: DataTypes.INTEGER(11),
    primaryKey: true
  },
  nombres:{
    type: DataTypes.STRING(45),
    allowNull: false
  },
  apellidos:{
    type: DataTypes.STRING(45),
    allowNull: false
  },
  descrpcion:{
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
},{
  timestamps: false
})

export default Autores;