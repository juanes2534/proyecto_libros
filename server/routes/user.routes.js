import express from "express";
import { postuser } from "../controllers/auth.controller.js";
import { upload } from "../multer/multer.js";
// esto es para poner rutas
const router = express.Router()

// ruta para registrar a un usuario
router.post("/postuser",postuser)
export default router