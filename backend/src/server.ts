import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/cidenetRoutes';

const app: Application = express();
let PORT:number = 3001;

// Importamos la conexion de MongoDB
import './index';
// =================================

//Rutas


// middlewares
app.use(express.urlencoded({extended:false, limit: '50mb'}));
app.use(express.json());

// cors
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: false,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	})
);

// rutas
app.use('/api', routes);

// Servidor Nodejs
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})

// Export
export default app;