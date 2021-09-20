import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import CostumersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const costumersRouter = Router();
const costumersController = new CostumersController();

costumersRouter.use(isAuthenticated);
costumersRouter.get('/', costumersController.index);

costumersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.show,
);

costumersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      cnpj: Joi.number().required(),
      cep: Joi.number().required(),
      numero: Joi.number().required(),
      rua: Joi.string().required(),
      bairro: Joi.string().required(),
      cidade: Joi.string().required(),
      complemento: Joi.string(),
    },
  }),
  costumersController.create,
);

costumersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cnpj: Joi.number().required(),
      cep: Joi.number().required(),
      numero: Joi.number().required(),
      rua: Joi.string().required(),
      bairro: Joi.string().required(),
      cidade: Joi.string().required(),
      complemento: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.update,
);

costumersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.delete,
);

export default costumersRouter;
