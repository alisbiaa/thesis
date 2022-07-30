import express from "express";
import BaseRouter from "../routes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {accessLogStream, handler} from "./logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import passport from "passport";
import {BearerStrategy} from "passport-azure-ad";
import {options} from "./authConfig";
import dotenv from "dotenv";

dotenv.config();

const {
    NODE_ENV
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Setting up cors
const corsOptions = {
    // origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

// Security
if (NODE_ENV === 'production') {
    app.use(helmet());
}

// Logger
if (NODE_ENV === 'development') {
    app.use(morgan(handler,{ stream: accessLogStream }));
}

console.log(options);
// sso
const bearerStrategy = new BearerStrategy(options, (token:any, done:any) => {
        // Send user info using the second argument
        done(null, {}, token);
    }
);
app.use(passport.initialize());
passport.use(bearerStrategy);


// simple route
app.get("/", passport.authenticate('oauth-bearer', {session: false}), (req, res) => {
    res.json({message: "Welcome to stackoverflow uni."});
});

app.use(BaseRouter);

// swagger
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


export default app;


