import {Administradores,Categorias,Compras,Libros,Usuarios} from '../models/associations.js'
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken'

// Esta funcion sirve para registrar a un usuario
export const postuser = async(req,res)=>{
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
        await Usuarios.create({
            cedula,
            usuario,
            nombres,
            apellidos,
            email,
            contrasena: hashedPassword
        })
        res.status(201).json({message:"Usuario creado correctamente"})
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
// Esta funcion sirve para el inicio de sesion
export const getuser = async(req,res)=>{
    const { usuario, contrasena} = req.body
    try {
        const user = await Usuarios.findOne({where:{usuario:usuario}})
        if (user!==null){
            let comparacion = bcrypt.compareSync(contrasena,user.contrasena)
            if (comparacion){
                const token = jwt.sign({userid:user.cedula}, 'secreto', {expiresIn: '7d'})
                res.status(200).json({message:"Inicio de sesión exitoso", token:token})
            }else{
                res.status(401).json({message:"Usuario y/o contraseña incorrecta"})
            }
        }else{
            res.status(401).json({message:"Usuario y/o contraseña incorrecta"})
        }
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al validar el usuario', error});
        }
    }
}
// Esta funcion sirve para el inicio de sesion de administrador
export const getadmin = async(req,res)=>{
    const { usuario, contrasena} = req.body
    try {
        const user = await Administradores.findOne({where:{usuario:usuario}})
        if (user!==null){
            let comparacion = bcrypt.compareSync(contrasena,user.contrasena)
            if (comparacion){
                const token = jwt.sign({userid:user.cedula}, 'secreto', {expiresIn: '7d'})
                res.status(200).json({message:"Inicio de sesión exitoso", token:token})
            }else{
                res.status(401).json({message:"Usuario y/o contraseña incorrecta"})
            }
        }else{
            res.status(401).json({message:"Usuario y/o contraseña incorrecta"})
        }
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al validar el usuario', error});
        }
    }
}
// Esta funcion obtiene a toda la informacion de los libros 
export const libros = async(req,res)=>{
    try {
        const libros= await Libros.findAll({attributes:{exclude:['archivo_pdf', 'fecha_publicacion', 'administradores_cedula']}})
        res.status(200).json(libros)
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al obtener los libros', error});
        }
    }
}
// Esta función sirve para mostrar los libros recientes
export const librosRecientes = async(req,res)=>{
    try {
        const datos= await Libros.findAll({
            limit: 8, // Limita la cantidad de datos recientes a 8
            order: [['fecha_publicacion', 'DESC']] // Ordena los datos por fecha de publicación de manera descendente
        })
        res.status(200).json(datos)
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al obtener los libros', error});
        }
    }
}
