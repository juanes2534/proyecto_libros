import express from "express";
import { upload } from "../multer/multer.js";
import { getadmin, imagenes, postadmin, postlibro } from "../controllers/admin.controller.js";
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
// ruta para registrar a un usuario
router.post("/postadmin",postadmin)
// ruta para obtener informacion del administrador
router.get("/getadmin",verificarToken,getadmin)
// ruta para registrar un libro
router.post("/postlibro", verificarToken, upload.fields([{name:'archivo', maxCount:1},{name: 'imagen', maxCount:1}]), postlibro)
// solo para montar las imagenes pertinentes
router.post("/imagenes", verificarToken, upload.fields([{name:'archivo', maxCount:1},{name: 'imagen', maxCount:1}]), imagenes)
export default router