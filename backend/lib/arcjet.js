import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";

import "dotenv/config"

//init arcjet 
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules: [
        //escudo protector contra inyeccion sql . etc 
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            //bloquea los bots excepto el bot de busqueda
            allow: ["CATEGORY:SEARCH_ENGINE"]
        }),
        tokenBucket({
            mode:"LIVE",
            refillRate: 5,
            interval: 10,
            capacity:10,
        })   
    ]
})