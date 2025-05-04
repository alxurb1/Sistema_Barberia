import { sql } from "../config/database.js";

export const getHaircuts = async(req,res ) => {
    try {
        const haircuts= await sql
        `SELECT * FROM corte`;
        console.log("Todos los tipos de cortes",haircuts);
        res.status(200).json({success:true, data:haircuts});
    } catch (error) {
        console.log("Error al recuperar cortes");
        res.status(500).json({success:false, message:"Internal Server Error (GET ALL HAIRCUTS)"});
    }
};
export const createHaircut = async(req,res) => {
    const {tipo_corte, precio_corte} = req.body

    if(!tipo_corte || !precio_corte){
        return res.status(400).json({success:false, message:"Todos los campos son requeridos"});
    }
    try {
        const newCut = await sql`
            INSERT INTO corte (tipo_corte, precio_corte) VALUES (${tipo_corte},${precio_corte})   
            RETURNING *      
        `
        console.log("Nuevo corte añadido")
        res.status(201).json({success:true, data:newCut[0]});
    } catch (error) {
        console.log("Error al crear un nuevo corte");
        res.status(500).json({success:false, message:"Internal Server Error (CREATE HAIRCUT)"});
    }
};
export const getHaircut = async(req,res) => {
    const {id_corte}=req.params;

    try {
        const getSingleCut = await sql`
            SELECT * FROM corte WHERE id_corte = ${id_corte}
        ` 
        res.status(200).json({success:true, data:getSingleCut[0]});
    } catch (error) {
        console.log("Error en obtener un corte", error);
        res.status(500).json({success:false, message: "Internal Server Error (GET A SINGLE HAIRCUT))"});
    }
};
export const updateHaircut = async(req,res)=> {
    const {id_corte} = req.params;
    const {tipo_corte, precio_corte} = req.body;
    try {
        const updateCut = await sql `
            UPDATE corte SET tipo_corte = ${tipo_corte}, precio_corte = ${precio_corte} WHERE id_corte = ${id_corte}
            RETURNING *
        `
        if(updateCut.length ===0){
            return res.status(404).json({
                success: false,
                message:"Corte no encontrado",
            });
        }
        res.status(200).json({success:true, data: updateCut[0]}); 
    } catch (error) {
        console.log("Error al actualizar su corte", error);
        res.status(400).json({success:false, message: "Internal Server Error (UPDATE HAIRCUT)"});
    }
};
export const deleteHaircut = async(req,res) => {
    const {id_corte} = req.params;
    
    try {
        const deleteCut = await sql `
        DELETE FROM corte WHERE id_corte = ${id_corte}
        RETURNING *
    ` 
    if(deleteCut.length === 0 ){
        return res.status(404).json({
            success: false,
            message:"Corte no encontrado",
        });
    }
    console.log("Corte eliminado con éxito");
    res.status(200).json({success:true, data : deleteCut[0]});
    } catch (error) {
        console.log("Error al eliminar su corte", error);
        res.status(500).json({success:false, message: "Internal Server Error (DELETE HAIRCUT)"});
    }
};