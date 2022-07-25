import app from "./utils/app";
import mongoose from "mongoose";

const {
    MONGO_CONNECTION_STRING,
    NODE_PORT
} = process.env;

console.log("---" + MONGO_CONNECTION_STRING);
mongoose
    .connect(MONGO_CONNECTION_STRING ?? "", {
        dbName: "thesis",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to DB...");
    })
    .catch(err => {
        console.error("Cannot connect to the database!", err);
        // process.exit();
    });

// set port, listen for requests
app.listen(NODE_PORT, () => {
    console.log(`Server is running on port ${NODE_PORT}.`);
});

