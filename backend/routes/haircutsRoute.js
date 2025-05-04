import express from "express";
import { createHaircut,getHaircuts,getHaircut,updateHaircut, deleteHaircut} from "../controllers/haircutsController.js";

const router = express.Router();

router.get("/",getHaircuts);
router.get("/:id_corte",getHaircut)
router.post("/",createHaircut);
router.put("/:id_corte",updateHaircut);
router.delete("/:id_corte",deleteHaircut)

export default router;