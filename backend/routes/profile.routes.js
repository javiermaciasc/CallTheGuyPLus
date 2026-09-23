// backend/routes/profile.routes.js

import { Router } from 'express';

// Controllers
import { getClientProfile, createClientProfile, updateClientProfile, deleteClientProfile } from '../controllers/profile.client.controller.js';
import { getGuyProfile, createGuyProfile, updateGuyProfile, deleteGuyProfile } from '../controllers/profile.guy.controller.js';
import { getGuyPlusProfile, createGuyPlusProfile, updateGuyPlusProfile, deleteGuyPlusProfile } from '../controllers/profile.guyplus.controller.js';

const router = Router();

/**
 * CLIENT
 */
router.get('/client/:id', getClientProfile);
router.post('/client', createClientProfile);
router.put('/client/:id', updateClientProfile);
router.delete('/client/:id', deleteClientProfile);

/**
 * GUY
 */
router.get('/guy/:id', getGuyProfile);
router.post('/guy', createGuyProfile);
router.put('/guy/:id', updateGuyProfile);
router.delete('/guy/:id', deleteGuyProfile);

/**
 * GUY PLUS
 */
router.get('/guyplus/:id', getGuyPlusProfile);
router.post('/guyplus', createGuyPlusProfile);
router.put('/guyplus/:id', updateGuyPlusProfile);
router.delete('/guyplus/:id', deleteGuyPlusProfile);

export default router;
