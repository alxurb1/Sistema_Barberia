import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import haircutsRoute from "./routes/haircutsRoute.js"
import clientsRoute from "./routes/clientsRoute.js"
import reservationsRoute from "./routes/reservationsRoute.js"
import { sql } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //extrae la info en formato json
app.use(cors());
app.use(helmet()); //helmet es un middleware de seguridad que se encarga de proteger mi app aplicando encabezados HTTP
app.use(morgan("dev")); // morgan se encarga de pintar los requests en la consola 

//APLICACION DE ARCJET 
app.use(async(req,res,next)=> {
    try {
        const decision = await aj.protect(req, {
            requested:1 //cada peticion consume un token 
        })
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error: "Muchas Peticiones"});
            }
            else if (decision.reason.isBot()){
                res.status(403).json({error: "Bot no permitido"});
            } else {
                res.status(403).json({error:"Prohibido"});
            }
            return
        }
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({error:"Suplantacion de identidad detectada"});
            return;
        }
        next()
    } catch (error) {
        console.log("Arcjet error", error);
        next(error);
    }
})

//RUTAS DE APIS    
app.use("/api/haircuts", haircutsRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/reservations", reservationsRoute);

async function initDB() {
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS Corte (
	id_corte SERIAL PRIMARY KEY,
	tipo_corte VARCHAR(100) NOT NULL,
	precio_corte DECIMAL(10,2) NOT NULL);
    `;
        await sql`
            CREATE TABLE IF NOT EXISTS Cliente (
	id_cliente SERIAL PRIMARY KEY,
	nombre_cliente VARCHAR(100) NOT NULL,
	tipo_cliente VARCHAR(50) NOT NULL);
    `;
        await sql`
            CREATE TABLE IF NOT EXISTS Cita(
	id_cita SERIAL PRIMARY KEY,
	fecha_cita DATE NOT NULL,
	hora_agendada_cita TIME NOT NULL,
	id_corte INTEGER NOT NULL,
	id_cliente INTEGER NOT NULL,
	precio_total_cita DECIMAL(10,2) NOT NULL,
	estado_cita VARCHAR(20) NOT NULL CHECK (estado_cita IN ('Pendiente','Cancelada','Realizada')),
	FOREIGN KEY (id_corte) REFERENCES corte(id_corte),
	FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente));
    `;
        console.log("The database is running OK")
    }catch(error){
        console.log("Error en initDB", error)
    }
}



app.get('/test',(req,res)=> {
    console.log(res.getHeaders());
    res.send('Esta es una ruta de prueba');
});

initDB().then(() =>{
    app.listen(PORT, ()=> {
        console.log("server has started on port" + " " + PORT)
    });
})
