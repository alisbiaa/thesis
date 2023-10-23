import express from "express";
import BaseRouter from "../routes";
import cors, {CorsOptions} from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {accessLogStream, handler} from "./logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import passport from "passport";
import {BearerStrategy} from "passport-azure-ad";
import {options} from "./authConfig";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const {
    NODE_ENV,
    CLIENT_ENDPOINT
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: "this_is_a_secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 360000,
            secure: false // this should be true only when you don't want to show it for security reason
        }
    })
)

// Setting up cors
const corsOptions : CorsOptions = {
    origin: CLIENT_ENDPOINT,
    credentials: true,
};

// app.use(cors(corsOptions));

// Security
if (NODE_ENV === 'production') {
    app.use(helmet());
}

// Logger
if (NODE_ENV === 'development') {
    // app.use(morgan(handler,{ stream: accessLogStream }));
    app.use(morgan('dev'));
}

// console.log(options);
// sso
// const bearerStrategy = new BearerStrategy(options, (token:any, done:any) => {
//         // Send user info using the second argument
//         done(null, {}, token);
//     }
// );
//
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(bearerStrategy);
//
// passport.serializeUser(function(user:any, done) {
//     done(null, user);
// });
//
// passport.deserializeUser(function(user:any, done) {
//     done(null, user);
// });

// simple route
// app.get("/", passport.authenticate('oauth-bearer', {session: true}), (req, res) => {
//     res.json({message: "Welcome to stackoverflow uni."});
// });

app.get("/", (req, res) => {
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


