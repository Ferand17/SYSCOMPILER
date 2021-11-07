import { Response, RequestHandler } from "express";
import * as datos from "../analizador/analizador";
let ast={};
export const getSalida: RequestHandler = (req,res)=>{
    console.log(datos.salida_toca)
    return res.json(datos.salida_toca);
};

export const getSalida2: RequestHandler = (req,res)=>{
    ast = datos.astsalida
    return res.json(JSON.stringify(ast));
};


export const setEntrada: RequestHandler = async (req,res)=>{
    await console.log(req.body.entrada)
    datos.run(req.body.entrada)
    return res.json('Get entrada');
};