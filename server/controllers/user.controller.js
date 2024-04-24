import {Administradores,Categorias,Compras,Libros,Usuarios} from '../models/associations.js'
import { Model, Op, QueryTypes } from "sequelize";
import Sequelize from 'sequelize';
import db from '../database/db.js';

// Esta funcion es para traer un libro en especifico
export const libro = async(req,res)=>{
    const {titulo} = req.body
    try {
        const datos = await Libros.findOne({where:{titulo:titulo}})
        res.status(200).json(datos)
    } catch (error) {
       if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            if (titulo!==null){
                res.status(200)
            }else{
                res.status(400).json({message:'Hubo un error al traer la información del libro', error});
            }
        }
    }
}
// Esta funcion trae la imagen del libro espefico
export const imagen = async(req,res) =>{
    res.status(200)
}
// Esta funcion trae el archivo del libro especifico
export const archivo_pdf = async(req,res)=>{
    res.status(200)
}
// Esta funcion registra la compra del libro por el usuario
export const comprar = async(req,res)=>{
    const {idlibros} = req.body
    try {
        const usuario = req.userid
        const user = await Compras.findOne({where:[{cedula_usuario:usuario},{idlibros:idlibros}]})
        if (user!==null){
            res.status(200).json({message:"Usuario ya compro el libro"})
        }else{
            await Compras.create({
                idlibros: idlibros,
                cedula_usuario:usuario
            })
            res.status(200).json({message:"Compra realizada correctamente"})
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            // Manejar el error de restricción de unicidad
            res.status(400).json({message: `Los datos ingresados ya existen en el sistema`, error:error.errors})
        } else if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al crear la compra por el libro seleccionado', error});
        }
    }
}
// Esta funcion verifica si el libro seleccionado ya ha sido comprado
export const verficarcompra = async(req,res)=>{
    const {idlibros} = req.body
    try {
        const usuario = req.userid
        console.log(idlibros)
        console.log(usuario)
        const user = await Compras.findAll({
            where:{
                cedula_usuario:usuario, 
                idlibros:idlibros
            }
        });
        console.log(user)
        if (user.length>0){
            const verificar=true
            console.log(verificar)
            res.status(200).json(verificar)
        }else{
            const verificar=false
            console.log(verificar)
            res.status(200).json(verificar)
        }
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al verificar el libro comprado', error});
        }
    }
}
// Esta función para obtener los libros depende de la categoria
export const categorias = async(req,res) =>{
    const {categoria} = req.body
    try {
        const dato= await Libros.findAll({where:{categoria:categoria}})
        res.status(200).json(dato)
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al traer los libros', error});
        }
    }
}
// Esta función sirve para obtener las compras que estan registrar por el usuario
export const descargas = async(req,res)=>{
    try {
        const usuario = req.userid
        const datos = await db.query(`SELECT l.idlibros,l.imagen,l.titulo,l.autor,l.descripcion,l.editorial,l.categoria,l.precio,l.archivo_pdf from libros AS l INNER JOIN compras AS c ON l.idlibros=c.idlibros INNER JOIN usuarios AS u ON c.cedula_usuario=u.cedula WHERE c.cedula_usuario=${usuario}`, 
        {type: QueryTypes.SELECT
        })
        res.status(200).json(datos)
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            // Manejar el error de restricción de unicidad
            res.status(400).json({message: `Los datos ingresados ya existen en el sistema`, error:error.errors})
        } else if (error instanceof Sequelize.DatabaseError) {
            // Manejar el error de base de datos
            res.status(400).json({message: `Error de base datos`, error:error.message})
        } else {
            // Manejar otros tipos de errores
            res.status(400).json({message:'Hubo un error al traer la informacion', error});
        }
    }
}
