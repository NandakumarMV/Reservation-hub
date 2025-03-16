import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const dbURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const dbOptions = {
  maxPoolSize: 15,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
}
const connectMongoDB = async () => {
  try {
    await mongoose.connect(dbURI, dbOptions);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectMongoDB