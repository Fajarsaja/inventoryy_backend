import express from "express";
import cors from "cors";
import UserRoute from  "./routes/UserRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "user API",
            version: "1.0.0",
        },
    },
   apis: ["./backend/*.js"],
};

const swaggerDoc = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(5000, ()=> console.log('server up and running...'));