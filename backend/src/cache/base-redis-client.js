import Redis from "ioredis";
import dotenv from "dotenv";
const envFile = `.env.${process.env.NODE_ENV || "prod"}`;
dotenv.config({ path: envFile });

// Establish Redis client connection
const baseRedisClient = new Redis({
  host: process.env.BASE_REDIS_BASE_URL,
  port: process.env.BASE_REDIS_PORT,
});

baseRedisClient.on("connect", () => {
  console.log("Connected to Redis successfully!");
});

baseRedisClient.on("error", (err) => {
  console.log("Error occurred while establishing Redis connection");
  console.error(err);
});

export default baseRedisClient;
