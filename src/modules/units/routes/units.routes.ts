import { Router } from 'express';
import UnitsController from '../controllers/UnitsController';
import { celebrate, Joi, Segments } from 'celebrate';

const unitsRouter = Router();
const unitsController = new UnitsController();

unitsRouter.get('/', unitsController.index);

unitsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  unitsController.show,
);

unitsRouter.get(
  '/search/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  unitsController.showByName,
);

unitsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      initials: Joi.string().required(),
    },
  }),
  unitsController.create,
);

unitsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      initials: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  unitsController.update,
);

unitsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      initials: Joi.string().required(),
    },
  }),
  unitsController.delete,
);

export default unitsRouter;
