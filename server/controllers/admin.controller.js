import {Administradores,Categorias,Compras,Libros,Usuarios} from '../models/associations.js'
import session from "express-session";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import Sequelize from 'sequelize';
import path from 'path'
import db from '../database/db.js';

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
// Esta funcion sirve para registrar un libro
export const postlibro = async(req,res)=>{
    const {
        titulo,
        autor,
        descripcion,
        editorial,
        categoria,
        precio
    }=req.body
    const archivo_pdf=req.files['archivo'][0].filename
    // const archivo_pdf= path.join("C:\\Users\\alexi\\proyecto_libros\\server",archivo);
    const imagen=req.files['imagen'][0].filename
    // const imagen= path.join("C:\\Users\\alexi\\proyecto_libros\\server", imagen1);
    console.log(imagen)
    console.log(archivo_pdf)
    const cedula = req.userid
    try {
        await Libros.create({
            imagen,
            titulo,
            autor,
            descripcion,
            editorial,
            categoria,
            precio,
            archivo_pdf,
            administradores_cedula: cedula
        })
        console.log(req.files)
        console.log(titulo)
        res.status(201).json({message:"Se ha ingresado correctamente el libro"})
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            // Manejar el error de restricción de unicidad
            res.status(400).json({message: `Los datos ingresados ya existen en el sistema`, error:error.errors})
        } else if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al crear el libro', error});
        }
    }
}

// Esta funcion es para subir solos imagenes y pdf (temporalmente)
export const imagenes = async(req,res)=>{
    const imagen = req.files.imagen[0]
    const archivo = req.files.archivo[0]
    const datos = {imagen, archivo}
    try {
        res.json(datos)
    } catch (error) {
        res.json({message:"Hubo un error al subir las imagenes y archivos"})
    }
}

// obtener la informacion de administrador
export const getadmin = async(req,res)=>{
    try {
        const dato=req.userid
        const datos= await Administradores.findOne({where:{cedula:dato}})
        res.status(200).json(datos)
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al obtener informacion del administrador', error});
        }
    }
}
// obtener cuantas ventas han sido por semana
export const ventaMes = async(req,res)=>{
    const {year} = req.body
    try {
        const countMonth=[]
        for (let i=1; i<=12; i++){
            const cantidad= await Compras.count({ 
                where: {
                    [Op.and]:[
                        db.where(db.fn('MONTH',db.col('fecha_compra')), i),
                        db.where(db.fn('YEAR', db.col('fecha_compra')), year)
                    ]
                }
            })
            countMonth.push(cantidad)
        }
        res.status(200).json({countMonth})
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al obtener informacion de la estadistica', error});
        }
    }
}