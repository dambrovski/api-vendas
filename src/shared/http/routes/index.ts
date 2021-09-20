import productsRouter from '@modules/products/routes/products.routes';
import categoriesRouter from '@modules/categories/routes/categories.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

import { Router } from 'express';
import ordersRouter from '@modules/orders/routes/orders.routes';
import unitsRouter from '@modules/units/routes/units.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/units', unitsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
