import express from "express";
import { getadmin, getuser, libros, librosRecientes, postuser } from "../controllers/auth.controller.js";

// esto es para poner rutas
const router = express.Router()
// Dar permisos al navegador que utilice la carpeta llamada libros
router.use('/libros', express.static('libros'));
// Dar permisos al navegador que utilice la carpeta llamada libros
router.use("librosRecientes",express.static('libros'))
// Ruta para registrar a un usuario
router.post("/postuser",postuser)
// Ruta para iniciar sesion el usuario
router.post("/getuser",getuser)
// Ruta para iniciar sesion el administrador
router.post("/getadmin",getadmin)
// Ruta para mostrar los datos de los libros ingresados
router.get("/libros",libros)
// Ruta para mostrar los libros recientes
router.get("/librosRecientes", librosRecientes)
export default router