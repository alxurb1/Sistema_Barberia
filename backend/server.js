import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //extrae la info en formato json
app.use(cors());
app.use(helmet()); //helmet es un middleware de seguridad que se encarga de proteger mi app aplicando encabezados HTTP
app.use(morgan("dev")); // morgan se encarga de pintar los requests en la consola 

app.listen(PORT, ()=> {
    console.log("server has started on port" + " " + PORT)
});

app.get('/test',(req,res)=> {
    console.log(res.getHeaders());
    res.send('Esta es una ruta de prueba');
});