import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import haircutsRoute from "./routes/haircutsRoute.js"
import { sql } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //extrae la info en formato json
app.use(cors());
app.use(helmet()); //helmet es un middleware de seguridad que se encarga de proteger mi app aplicando encabezados HTTP
app.use(morgan("dev")); // morgan se encarga de pintar los requests en la consola 

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
app.use("/api/haircuts", haircutsRoute);

app.get('/test',(req,res)=> {
    console.log(res.getHeaders());
    res.send('Esta es una ruta de prueba');
});

initDB().then(() =>{
    app.listen(PORT, ()=> {
        console.log("server has started on port" + " " + PORT)
    });
})
