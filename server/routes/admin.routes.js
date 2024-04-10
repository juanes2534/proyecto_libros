import express from "express";
import { upload } from "../multer/multer.js";
import { postadmin } from "../controllers/admin.controller.js";
// esto es para poner rutas
const router = express.Router()

// ruta para registrar a un usuario
router.post("/postadmin",postadmin)
export default router