import { Response, RequestHandler } from "express";

export const getSalida: RequestHandler = (req,res)=>{
    return res.json('Get Salida');
};

export const setEntrada: RequestHandler = async (req,res)=>{
    await console.log(req.body);
    return res.json('Get Salida');
};