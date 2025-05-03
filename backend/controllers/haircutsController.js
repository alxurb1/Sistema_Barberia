import { sql } from "../config/database.js";

export const getHaircuts = async(req,res ) => {
    try {
        const haircuts= await sql
        `SELECT * FROM corte`;
        res.status(200).json({success:true, data:haircuts});
    } catch (error) {
        console.log("Error al recuperar cortes")
    }
};
export const createHaircut = async(req,res) => {};
export const updateHaircut = async(req,res) => {};
export const getHaircut = async(req,res)=> {};
export const deleteHaircut = async(req,res) => {};