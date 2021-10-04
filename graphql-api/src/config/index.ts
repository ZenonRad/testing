export default {
  PORT: process.env.PORT ?? 4000,
  MONGO_URL: process.env.MONGO_URL ?? "mongodb://localhost:27017/smart_predict",
  JWT_ACCESS_TOKEN_SECRET: "hyper-secret",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT ?? 6379,
  REDIS_TLS: process.env.REDIS_TLS,
};
