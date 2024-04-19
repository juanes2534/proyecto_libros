import express from "express";
import { upload } from "../multer/multer.js";
import { archivo_pdf, categorias, comprar, descargas, imagen, libro, verficarcompra } from "../controllers/user.controller.js";
// esto es para poner rutas
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
const router = express.Router()
router.use('/imagen', express.static('libros'));
router.use("/archivo_pdf", express.static('libros'))
router.use("/libro", express.static('libros'))
// Ruta para obtener la información de un libro en especifico
router.post("/libro",libro)
// router.get("/libro",libro)
router.get("/imagen/",imagen)
router.get("/archivo_pdf/",archivo_pdf)
router.post("/compra",verificarToken, comprar)
router.post("/verificarCompra",verificarToken,verficarcompra)
router.post("/categorias",categorias)
router.get("/descargas",verificarToken,descargas)
export default router