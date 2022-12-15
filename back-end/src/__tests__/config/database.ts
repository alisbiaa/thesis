import mongoose from "mongoose";

const {
    MONGO_CONNECTION_STRING_CLOUD,
} = process.env;

function sleep(ms:any) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export const connect = async () => {
    await mongoose.connect(MONGO_CONNECTION_STRING_CLOUD ?? "", {
        dbName: "test_database",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        logger : console.log,
        loggerLevel : "info",

        useCreateIndex: true,
        autoIndex: true,
        // useFindAndModify: false
    }).catch(e => console.log("CONNECTION ERROR : " + e));

    // mongoose.connect()
};

export const close = async () => {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    } catch (e) {
        console.log("CLOSE ERROR : " + e);
    }

};

export const clear = async () => {
    try {
        await sleep(500); // in order to avoid buffering timeout
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    } catch (e) {
        console.log("CLEAR ERROR : " + e)
    }

};
