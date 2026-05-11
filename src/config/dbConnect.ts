import mongoose from "mongoose";

async function conectaBanco() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
}

export default conectaBanco;
