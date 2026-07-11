import mongoose, { ConnectOptions } from "mongoose";

interface Global {
  connection: {
    instance?: typeof mongoose | null;
    promise?: Promise<typeof mongoose> | null;
  };
}

declare const global: Global;

const uri = process.env.MONGODB_URI;

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

if (!global?.connection) {
  global.connection = { instance: null, promise: null };
}

const connection = global.connection;

async function db() {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  if (connection?.instance) {
    return connection.instance;
  }

  if (!connection?.promise) {
    connection.promise = mongoose.connect(uri, clientOptions);
  }

  try {
    connection.instance = await connection.promise.then((_db) => _db);

    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    connection.promise = null;
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}

export default db;
