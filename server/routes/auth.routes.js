import express from "express";
import { getadmin, getuser, postuser } from "../controllers/auth.controller.js";
import { upload } from "../multer/multer.js";
// esto es para poner rutas
const router = express.Router()

// ruta para registrar a un usuario
router.post("/postuser",postuser)
// ruta para iniciar sesion el usuario
router.post("/getuser",getuser)
// ruta para iniciar sesion el administrador
router.post("/getadmin",getadmin)
export default router