import express from 'express';
import {
  createAttainmentSheet,
  getAttainmentSheets,
  getAttainmentSheetById,
  updateAttainmentSheet,
  deleteAttainmentSheet,
  downloadAttainmentSheet,
} from '../Controllers/CopoController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const CopoRouter = express.Router();

CopoRouter.post('/create', protect, createAttainmentSheet);
CopoRouter.get('/user', protect, getAttainmentSheets);
CopoRouter.get('/:id', protect, getAttainmentSheetById);
CopoRouter.put('/:id', protect, updateAttainmentSheet);
CopoRouter.delete('/:id', protect, deleteAttainmentSheet);
CopoRouter.get('/download/:id', protect, downloadAttainmentSheet);

export default CopoRouter;