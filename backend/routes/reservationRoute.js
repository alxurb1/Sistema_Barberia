import express from "express";
import {getReservations,getReservation, createReservation,updateReservation,deleteReservation } from "../controllers/reservationController.js"

const router = express.Router();

router.get("/", getReservations);
router.get("/:id_cita", getReservation);
router.post("/", createReservation);
router.put("/:id_cita", updateReservation);
router.delete("/:id_cita", deleteReservation);

export default router;