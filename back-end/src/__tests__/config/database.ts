import mongoose from "mongoose";

const {
    MONGO_CONNECTION_STRING_CLOUD,
} = process.env;


export const connect = async () => {
    await mongoose.connect(MONGO_CONNECTION_STRING_CLOUD ?? "", {
        dbName: "test_database",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false
    });
};


export const close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};

export const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};
