import { sql } from "../config/database.js";

export const getReservations = async(req,res)=>{
    try {
        const getAllReservations = await sql `
            SELECT * FROM cita 
        `
        console.log("Las citas existentes", getAllReservations)
        res.status(200).json({success: true, data:getAllReservations});
    } catch (error) {
        console.log("Hubo un error al mostrar todas las citas")
        res.status(500).json({success:false, message:"INTERNAL SERVER ERROR (GET ALL RESERVATIONS)"})
    }
};
export const getReservation = async(req,res)=>{
    const {id_cita} = req.params;
    try {
        const getSingleReservation = await sql`
            SELECT * FROM cita WHERE id_cita = ${id_cita}
            RETURNING *
        `
        res.status(200).json({success:true, data: getSingleReservation[0]})
    } catch (error) {
        console.log("Hubo un error al mostrar la cita")
        res.status(500).json({success:false, message:"INTERNAL SERVER ERROR (GET SINGLE RESERVATION)"})
    }
};
export const createReservation = async(req,res)=>{
    const {fecha_cita, hora_agendada_cita, id_corte, id_cliente, precio_total_cita, estado_cita} = req.body;

    if( !fecha_cita || !hora_agendada_cita || !id_corte || !id_cliente || !precio_total_cita || !estado_cita){
        res.status(400).json({success : false , message: "Todos los campos son requeridos"});
    }
    
    try {
        const createReservation = await sql`
            INSERT INTO cita (fecha_cita, hora_agendada_cita, id_corte, id_cliente, precio_total_cita, estado_cita) VALUES ( ${fecha_cita},${hora_agendada_cita},${id_corte},${id_cliente},${precio_total_cita},${estado_cita})
            RETURNING *  
        `
        console.log("Cita agregada correctamente")
        res.status(201).json({success:true, data:createReservation[0]})
    } catch (error) {
        console.log("Hubo un error al crear la cita")
        res.status(500).json({success:false, message:"INTERNAL SERVER ERROR (GET CREATE RESERVATION)"})
    }

};
export const updateReservation = async(req,res)=>{
    const {id_cita} = req.params;
    const {fecha_cita, hora_agendada_cita, id_corte, id_cliente, precio_total_cita, estado_cita} = req.body;

    try {
        const updateReservation = await sql`
            UPDATE cita SET fecha_cita = ${fecha_cita}, hora_agendada_cita = ${hora_agendada_cita}, id_corte = ${id_corte},id_cliente = ${id_cliente},precio_total_cita = ${precio_total_cita}, estado_cita = ${estado_cita} WHERE id_cita = ${id_cita}  
            RETURNING * 
        `
        if(updateReservation.length === 0 ){
            return res.status(404).json({
                success: false,
                message:"Cita no encontrada",
            });
        }
        console.log("Cita actualizada correctamente");
        res.status(200).json({success : true, data: updateReservation[0]})
    } catch (error) {
        console.log("Error al actualizar su cita", error);
        res.status(400).json({success:false, message: "Internal Server Error (UPDATE RESERVATION)"});
    }
};
export const deleteReservation = async(req,res)=>{
    const{id_cita} = req.params;
    try {
        const deleteReservation = await sql`
            DELETE FROM cita WHERE id_cita = ${id_cita}
            RETURNING *
        `
        if(deleteReservation.length ===0)
            return res.status(400).json({
                success : false,
                message: "Cita no encontrada",
            });
        console.log("Cita eliminada correctamente");
        res.status(200).json({success: true, data: deleteReservation[0]});
    } catch (error) {
        console.log("Error al eliminar su cita", error);
        res.status(400).json({success:false, message: "Internal Server Error (DELETE RESERVATION)"});
    }
};