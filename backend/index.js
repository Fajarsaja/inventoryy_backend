import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swager.js'; 

const app = express();


app.use(cors());


app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(UserRoute);

app.listen(5000, () => console.log('Server up and running on port 5000...'));