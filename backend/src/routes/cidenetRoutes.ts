import express from 'express';
import { Application } from 'express';
import controllers from '../controllers/cidenetControllers';

const routes: Application = express();

routes.get('/home', controllers.home);
routes.get('/getEmployees', controllers.getEmployees);
routes.post('/createEmployee', controllers.createEmployee);
routes.delete('/deleteAllEmployees', controllers.deleteAllEmployees);
routes.post('/searchEmployee', controllers.searchEmployee);
routes.post('/deleteEmployee', controllers.deleteEmployee);
routes.put('/editEmployee', controllers.editEmployee);

export default routes;
