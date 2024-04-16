import {Administradores,Categorias,Compras,LibroCategorias,Libros,Usuarios} from '../models/associations.js'
import session from "express-session";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import Sequelize from 'sequelize';
import path from 'path'
import { constrainedMemory } from 'process';

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
        await Compras.create({
            idlibros: idlibros,
            cedula_usuario:usuario
        })
        res.status(200).json({message:"Compra realizada correctamente"})
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
