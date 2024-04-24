import express from "express";
import { upload } from "../multer/multer.js";
import { editarLibro, eliminarLibro, getadmin,libro, postadmin, postlibro, ventaMes } from "../controllers/admin.controller.js";
import jwt from 'jsonwebtoken'
// esto es para poner rutas
const router = express.Router()

const verificarToken=(req,res, next)=>{
    // const token = req.headers.authorization?.split(' ')[1];
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
// Ruta para registrar a un usuario
router.post("/postadmin",postadmin)
// Ruta para obtener informacion del administrador
router.get("/getadmin",verificarToken,getadmin)
// Ruta para registrar un libro
router.post("/postlibro", verificarToken, upload.fields([{name:'archivo', maxCount:1},{name: 'imagen', maxCount:1}]), postlibro)
// Ruta para mostrar cuantas ventas han sido por mes
router.post("/ventaMes",verificarToken,ventaMes)
// Ruta para mostrar la información de un solo libro
router.post("/libro",verificarToken,libro)
// Ruta para eliminar un libro
router.post("/eliminarLibro",verificarToken,eliminarLibro)
// Ruta para editar informacion de un libro
router.post("/editarLibro",verificarToken, upload.fields([{name:'archivo', maxCount:1},{name: 'imagen', maxCount:1}]), editarLibro)
export default router