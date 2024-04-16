import express from "express";
import { cancelarOrden, capturaOrden, crearOrden } from '../controllers/payment.controller.js'
import {} from '../config.js'
const router = express.Router()

router.post('/crearOrden',crearOrden)
router.post('/capturaOrden',capturaOrden)
router.post('/cancelarOrden',cancelarOrden)
export default router