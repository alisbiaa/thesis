import app from "./utils/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const {
    NODE_PORT,
    MONGO_CONNECTION_STRING
} = process.env;

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

app.get('/health', (req, res) => {
    // Check connection state
    if (mongoose.connection.readyState === 1) {
        res.status(200).send("HEALTHY");
    } else {
        res.status(500).send("NOT HEALTHY");
    }
});


// set port, listen for requests
app.listen(NODE_PORT, () => {
    console.log(`Server is running on port ${NODE_PORT}.`);
});

