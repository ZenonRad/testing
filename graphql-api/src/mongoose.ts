import { Connection, createConnection } from "mongoose";
import { sleep } from "./repositories";

const getLogger = () => console;

export const getMongooseConnection = (): {
  connection: Connection;
  openConnection: (mongoUrl: string, connection: Connection) => Promise<void>;
} => {
  const logger = getLogger();

  const connection = createConnection();

  connection.on("error", (error: Error & { reason?: Object }) => {
    logger.error(
      `${error.message
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())}; reason: ${JSON.stringify(
        error.reason,
      )}; uri: ${connection.host}:${connection.port}`,
    );
  });

  connection.on("open", () => {
    logger.info(`Connected to mongodb ${connection.host}:${connection.port}`);
  });

  const openConnection = async (mongoUrl: string, connection: Connection) => {
    try {
      await connection.openUri(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      // Wait 1 sec before trying to reconnect again
      await sleep(1000);

      logger.info("Reconnecting...");
      await openConnection(mongoUrl, connection);
    }
  };

  return { connection, openConnection };
};
