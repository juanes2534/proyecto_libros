import express from "express";
import {cancelarOrden, capturaOrden, crearOrden } from '../controllers/payment.controller.js'
const router = express.Router()

router.post('/crearOrden',crearOrden)
router.get('/capturaOrden',capturaOrden)
router.post('/cancelarOrden',cancelarOrden)
export default router