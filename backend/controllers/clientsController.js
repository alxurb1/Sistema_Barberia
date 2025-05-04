import { sql } from "../config/database.js";

export const getClients = async(req,res)=> {
    try {
        const getAllClients = await sql`
            SELECT * FROM cliente
        `
        res.status(200).json({success:true, data:getAllClients});
    } catch (error) {
        console.log("No se ha podido importar todos los clientes");
        res.status(500).json({success:false,message:"INTERNAL SERVER ERROR (GET CLIENTS)"});
    }
};
export const getClient = async(req,res)=> {
    const {id_cliente } = req.params;
    try {
        const getSingleClient = await sql`
            SELECT * FROM cliente WHERE id_cliente = ${id_cliente}
        `
        console.log("Su cliente es ");
        res.status(200).json({success:true,data:getSingleClient[0]});
    } catch (error) {
        console.log("Error al recuperar al cliente");
        res.status(500).json({success:false,message:"INTERNAL SERVER ERROR (SINGLE CLIENT)"})
    }
};
export const createClient = async(req,res)=> {
    const {nombre_cliente,tipo_cliente} = req.body;

    if(!nombre_cliente || !tipo_cliente){
        res.status(400).json({success:false, message: "Todos los campos son requeridos"});
    }
    try {
        const createClient = await sql `
            INSERT INTO cliente (nombre_cliente, tipo_cliente) VALUES (${nombre_cliente},${tipo_cliente})
            RETURNING * 
        `
        console.log("Nuevo cliente añadido")
        res.status(201).json({success:true, data:createClient[0]})
    } catch (error) {
        console.log("Error al crear un nuevo cliente");
        res.status(500).json({success:false, message:"Internal Server Error (CREATE CLIENT)"});
    }
};
export const updateClient = async(req,res)=> {
    const {id_cliente} = req.params;
    const {nombre_cliente,tipo_cliente} = req.body;
    try {
        const updateClient = await sql `
            UPDATE cliente SET nombre_cliente = ${nombre_cliente}, tipo_cliente = ${tipo_cliente} WHERE id_cliente = ${id_cliente}
            RETURNING * 
        `
        if(updateClient.length === 0){
            return res.status(404).json({
                success: false,
                message:"Cliente no encontrado",
            });
        }
        res.status(200).json({success:true,data:updateClient[0]});
    } catch (error) {
        console.log("Error al actualizar el cliente", error);
        res.status(400).json({success:false, message: "Internal Server Error (UPDATE CLIENT)"});
    }
};
export const deleteClient = async(req,res)=> {
    const {id_cliente} = req.params;
    try {
        const deleteClient = await sql `
            DELETE FROM cliente WHERE id_cliente = ${id_cliente}
            RETURNING *
        `
        if(deleteClient.length === 0 ){
            return res.status(404).json({
                success: false,
                message:"Cliente no encontrado",
            });
        }
        console.log("Cliente eliminado con éxito");
        res.status(200).json({success:true, data : deleteClient[0]})
    } catch (error) {
        console.log("Error al eliminar el cliente", error);
        res.status(500).json({success:false, message: "Internal Server Error (DELETE CLIENT)"});
    }
};