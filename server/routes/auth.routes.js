import express from "express";
import { getadmin, getuser, libros, librosRecientes, postuser } from "../controllers/auth.controller.js";
import { upload } from "../multer/multer.js";
// esto es para poner rutas
const router = express.Router()
router.use('/libros', express.static('libros'));
router.use("librosRecientes",express.static('libros'))
// ruta para registrar a un usuario
router.post("/postuser",postuser)
// ruta para iniciar sesion el usuario
router.post("/getuser",getuser)
// ruta para iniciar sesion el administrador
router.post("/getadmin",getadmin)
// ruta para mostrar los datos de los libros ingresados
router.get("/libros",libros)
// ruta para mostrar los libros recientes
router.get("/librosRecientes", librosRecientes)
export default router