import {Router} from 'express';
import * as backendctrl  from './backend.controller';

const router = Router();

router.get('/salida',backendctrl.getSalida);

router.post('/entrada',backendctrl.setEntrada);

export default router;