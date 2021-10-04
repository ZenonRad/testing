import * as Redis from "ioredis";
import config from "./config";

const getLogger = () => console;

export const createRedisConfig = (
  isTLS: boolean,
  host: string,
  port: string | number,
  password: string | undefined
) => {
  if (isTLS) {
    return {
      tls: {
        host,
        port: port ? +port : 1000,
      },
      password,
    };
  } else {
    return {
      host,
      port: port ? +port : 1000,
    };
  }
};

export const getRedisInstance = ({
  isTLS,
  host,
  port,
  password,
}: RedisConfig): Redis.Redis => {
  const loggerToUse = getLogger();

  const redis = new Redis(createRedisConfig(isTLS, host, port, password));
  redis.on("connect", () => loggerToUse.info(`Connected to ${host}:${port}`));
  redis.on("error", (...args: any[]) => loggerToUse.error(args));
  redis.on("reconnecting", () => loggerToUse.info("Reconnecting..."));

  return redis;
};

export const redis = getRedisInstance({
  isTLS: config.REDIS_TLS === "1",
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
});

interface RedisConfig {
  isTLS: boolean;
  host: string;
  port: string | number;
  password?: string;
}
