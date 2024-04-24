import express from "express";
import { upload } from "../multer/multer.js";
import { archivo_pdf, categorias, comprar, descargas, imagen, libro, verficarcompra } from "../controllers/user.controller.js";
import jwt from 'jsonwebtoken'

const verificarToken=(req,res, next)=>{
    const token = req.headers['authorization'];
    if (!token){
        return res.status(401).json({message: 'Token no proporcionado'})
    }
    jwt.verify(token,'secreto',(err,decodedToken)=>{
    if (err){
        return res.status(403).json({message: 'Token inválido'})
    }
    req.userid = decodedToken.userid;
    next()
    });
}
// Esto es para poner rutas
const router = express.Router()
// Dar permisos al navegador que utilice la carpeta llamada libros
router.use('/imagen', express.static('libros'));
// Dar permisos al navegador que utilice la carpeta llamada libros
router.use("/archivo_pdf", express.static('libros'))
// Dar permisos al navegador que utilice la carpeta llamada libros
router.use("/libro", express.static('libros'))
// Ruta para obtener la información de un libro en especifico
router.post("/libro",libro)
// Ruta para obtener la imagen del libro especifico
router.get("/imagen/",imagen)
// Ruta para obtener el archivo pdf del libro especifico
router.get("/archivo_pdf/",archivo_pdf)
// Ruta para almacenar la compra del usuario
router.post("/compra",verificarToken, comprar)
// Ruta para verificar si el usuario ya compro el libro seleccionado
router.post("/verificarCompra",verificarToken,verficarcompra)
// Ruta para obtener todas las categorias de los libros
router.post("/categorias",categorias)
// Ruta para obtener las descargas del usuario
router.get("/descargas",verificarToken,descargas)
export default router