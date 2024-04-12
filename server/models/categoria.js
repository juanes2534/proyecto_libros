// categorias.js
import { DataTypes} from "sequelize";
import db from '../database/db.js';

const Categorias = db.define('categorias',{
  id_categorias: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  nombre:{
    type: DataTypes.STRING(70),
    allowNull: false
  }
},{
  timestamps: false
})

export default Categorias;