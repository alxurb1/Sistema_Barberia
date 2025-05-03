import express from "express";
import { createHaircut,getHaircuts,getHaircut,updateHaircut, deleteHaircut} from "../controllers/haircutsController.js";

const router = express.Router();

router.get("/",getHaircuts);
router.get("/:id",getHaircut)
router.post("/",createHaircut);
router.post("/:id",updateHaircut);
router.delete("/:id",deleteHaircut)

export default router;