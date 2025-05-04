import express from "express";
import { getClients,getClient,createClient,updateClient, deleteClient} from "../controllers/clientsController.js";

const router = express.Router();

router.get("/",getClients);
router.get("/:id_cliente",getClient)
router.post("/",createClient);
router.put("/:id_cliente",updateClient);
router.delete("/:id_cliente",deleteClient)

export default router;