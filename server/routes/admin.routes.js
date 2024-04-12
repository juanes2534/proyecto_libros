import express from "express";
import { upload } from "../multer/multer.js";
import { postadmin, postlibro } from "../controllers/admin.controller.js";
// esto es para poner rutas
const router = express.Router()

// ruta para registrar a un usuario
router.post("/postadmin",postadmin)
// ruta para registrar un libro
router.post("/postlibro", upload.fields([{name:'archivo', maxCount:1},{name: 'imagen', maxCount:1}]), postlibro)
export default router