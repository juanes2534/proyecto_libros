import {Administradores,Categorias,Compras,LibroCategorias,Libros,Usuarios} from '../models/associations.js'
import session from "express-session";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import Sequelize from 'sequelize';

// Esta funcion sirve para registrar a un usuario
export const postadmin = async(req,res)=>{
    const {
        cedula,
        nombres,
        apellidos,
        usuario,
        email,
        contrasena
    } = req.body
    try {
        const hashedPassword = await bcrypt.hash(contrasena,5)
        await Administradores.create({
            cedula,
            usuario,
            nombres,
            apellidos,
            email,
            contrasena: hashedPassword
        })
        res.status(201).json({message:"Administrador creado correctamente"})
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            // Manejar el error de restricción de unicidad
            res.status(400).json({message: `Los datos ingresados ya existen en el sistema`, error:error.errors})
        } else if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al crear el usuario', error});
        }
    }
}
