import baseRedisClient from "./base-redis-client.js";

export const storeOTP = async (id, otp) => {
  await baseRedisClient.setex(`otp:${id.toString()}`, process.env.REDIS_TTL, otp);
};

export const verifyOTP = async (id, otp) => {
  const storedOTP = await baseRedisClient.get(`otp:${id}`);
  return storedOTP === otp;
};

export const deleteOTP = async (id) => {
  await baseRedisClient.del(`otp:${id}`);
};