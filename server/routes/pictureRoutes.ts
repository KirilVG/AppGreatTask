import { Router } from 'express';
import pictureController from '../controllers/pictureController';

const picturesRouter = Router();

picturesRouter.post('/pictures', pictureController.create);
picturesRouter.get('/pictures', pictureController.getAll);
picturesRouter.get('/pictures/:id', pictureController.getById);
picturesRouter.patch('/pictures/:id', pictureController.updateById);
picturesRouter.delete('/pictures/:id', pictureController.deleteById);

export default picturesRouter;