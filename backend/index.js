import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js';
import InventoryRoute from './routes/InventoryRoute.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swager.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

const app = express();



const SessionStore = SequelizeStore(session.Store);

const store = new SessionStore({
  db: db
});


(async () => {
  try {
    await db.sync({ alter: true });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(UserRoute);
app.use(InventoryRoute);
app.use(AuthRoute);




app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on port ${process.env.APP_PORT}...`);
});
