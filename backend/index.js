import express from "express";
import cors from "cors";
import UserRoute from  "./routes/UserRoute.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swager.js';


const app = express();

app.use(cors());
app.use(UserRoute);
app.use(express.json());

// Middleware untuk Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(5000, ()=> console.log('server up and running...'));