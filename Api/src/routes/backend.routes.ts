import {Router} from 'express';
import * as backendctrl  from './backend.controller';

const router = Router();

router.get('/salida',backendctrl.getSalida);
router.get('/salida2',backendctrl.getSalida2);

router.post('/entrada',backendctrl.setEntrada);

export default router;