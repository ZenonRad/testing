import { ConfirmChannel } from "amqplib";

import { RABBITMQ_URL, RPC_QUEUE } from "../constants";
import { connectRabbitMQ } from "../helpers";

export class RPCServer {
  private procedures: Record<string, (kwargs: unknown) => Promise<any>>; // eslint-disable-line no-unused-vars

  constructor() {
    this.procedures = {};
  }

  setProcedure(
    name: string,
    procedure: (kwargs: unknown) => Promise<any> // eslint-disable-line no-unused-vars
  ) {
    this.procedures[name] = procedure;
  }

  async listen(
    amqpUrl: string,
    queueName: string,
    {
      durableQueue = false,
      exclusiveQueue = false,
      persistentMessage = false,
    }: {
      durableQueue?: boolean;
      exclusiveQueue?: boolean;
      persistentMessage?: boolean;
    } = {}
  ) {
    const connection = connectRabbitMQ(amqpUrl);

    const channelWrapper = connection.createChannel({
      json: true,

      setup: (channel: ConfirmChannel) => {
        channel.assertQueue(queueName, {
          durable: durableQueue,
          exclusive: exclusiveQueue,
        });

        channel.prefetch(1);
      },
    });

    await channelWrapper.consume(
      queueName,
      async (message) => {
        const { procedure: procedureName, kwargs }: Payload = JSON.parse(
          message.content.toString()
        );

        console.info(`Received a message from queue ${queueName}.`);

        // Get procedure
        const procedure:
          | ((kwargs: unknown) => Promise<any>) // eslint-disable-line no-unused-vars
          | undefined = this.procedures[procedureName];

        if (procedure) {
          console.info(`Processing "${procedureName}"...`);

          let response: any;

          try {
            if (
              kwargs &&
              !(
                typeof kwargs === "object" &&
                kwargs &&
                !Object.keys(kwargs).length
              )
            )
              response = await procedure(kwargs);
            else response = await procedure(undefined);

            console.info(
              `Message processed, sending response to queue ${message.properties.replyTo}...`
            );

            await channelWrapper.sendToQueue(
              message.properties.replyTo,
              { response },
              {
                correlationId: message.properties.correlationId,
                persistent: persistentMessage,
              }
            );

            console.info(
              `Response sent to queue ${message.properties.replyTo}.`
            );
          } catch (error) {
            await channelWrapper.sendToQueue(
              message.properties.replyTo,
              //@ts-ignore
              { error: error.message ?? error.toString() },
              {
                correlationId: message.properties.correlationId,
                persistent: persistentMessage,
              }
            );
          }
        } else {
          console.warn(`Procedure not found, message dropped.`);
        }

        channelWrapper.ack(message);
      },
      { noAck: false }
    );

    console.info(`Listening to queue ${queueName}...`);
  }
}

interface Payload {
  procedure: string;
  kwargs?: unknown;
}

(async () => {
  const server = new RPCServer();

  server.setProcedure("hello", async (name: unknown) => {
    if (typeof name === "string") return `Hello ${name}!`;
    throw new Error("Wrong argument");
  });

  server.setProcedure("get", async () => ["BigQuery", "Cloud Storage", "AWS"]);

  server.setProcedure("timeout", async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return "Timeout response";
  });

  server.setProcedure("error", async () => {
    throw new Error("This is a test");
  });

  server.listen(RABBITMQ_URL, RPC_QUEUE);
})();
