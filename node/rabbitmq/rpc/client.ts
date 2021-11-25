import { ConfirmChannel } from "amqplib";

import { RABBITMQ_URL, RPC_QUEUE } from "../constants";
import { connectRabbitMQ } from "../helpers";

/**
 * Call remote procedure
 *
 * Call remote procedure using RabbitMQ. Throw a time out error after 30 secs by default.
 * Timeout value can be configured. You can disable timeout by providing negative value.
 *
 * @param {string} amqpUrl       RabbitMQ url.
 * @param {string} queueName     Name of the queue used for procedure call.
 * @param {string} procedure     Name of the procedure to call.
 * @param {any}    [kwargs]        Argument to pass to the procedure call.
 * @param {object} options       Other optional options.
 *
 * @return {any} Response returned by the procedure.
 */
export const callRemoteProcedure = async <K = any, R = any>(
  amqpUrl: string,
  queueName: string,
  procedure: string,
  kwargs?: K,
  {
    timeout = 30000,
    durableQueue = false,
    exclusiveQueue = false,
    persistentMessage = false,
  }: {
    timeout?: number;
    durableQueue?: boolean;
    exclusiveQueue?: boolean;
    persistentMessage?: boolean;
  } = {}
): Promise<R> =>
  new Promise(async (resolve, reject) => {
    console.log("\n");

    const connection = connectRabbitMQ(amqpUrl);

    const correlationId = generateCorrelationId();
    const responseQueue = `queue.${correlationId}`;

    const channelWrapper = connection.createChannel({
      json: true,

      setup: async (channel: ConfirmChannel) => {
        await channel.assertQueue(queueName, {
          durable: durableQueue,
          exclusive: exclusiveQueue,
        });

        await channel.assertQueue(responseQueue, {
          exclusive: true,
        });
      },
    });

    let nodeTimeout: { id?: NodeJS.Timeout } = {};

    await channelWrapper.consume(
      responseQueue,
      async (message) => {
        if (message.properties.correlationId === correlationId) {
          if (nodeTimeout.id) clearTimeout(nodeTimeout.id);
          await connection.close();

          const payload: { response: R } | { error: string } = JSON.parse(
            message.content.toString()
          );

          if ("error" in payload) reject(new Error(payload.error));

          if ("response" in payload) {
            console.info(`Response received from queue "${responseQueue}".`);
            resolve(payload.response);
          }
        }
      },
      { noAck: true }
    );

    console.info(
      `Calling procedure "${procedure}" using queue "${queueName}"...`
    );

    await channelWrapper.sendToQueue(
      queueName,
      { procedure, kwargs },
      { correlationId, replyTo: responseQueue, persistent: persistentMessage }
    );

    if (timeout > 0)
      nodeTimeout.id = setTimeout(() => {
        connection.close();
        reject(new Error("Time out"));
      }, timeout);

    console.info(`Message sent to queue "${queueName}"`);
  });

function generateCorrelationId(): string {
  return new Date().getTime().toString();
}

(async () => {
  console.log(
    await callRemoteProcedure<string, string>(
      RABBITMQ_URL,
      RPC_QUEUE,
      "hello",
      "Junior"
    )
  );

  console.log(
    await callRemoteProcedure<undefined, string[]>(
      RABBITMQ_URL,
      RPC_QUEUE,
      "get"
    )
  );

  try {
    console.log(
      await callRemoteProcedure<undefined, string[]>(
        RABBITMQ_URL,
        RPC_QUEUE,
        "timeout",
        undefined,
        { timeout: 5000 }
      )
    );
  } catch (error) {
    //@ts-ignore
    console.error(error.toString());
  }

  try {
    console.log(
      await callRemoteProcedure<undefined, string[]>(
        RABBITMQ_URL,
        RPC_QUEUE,
        "error"
      )
    );
  } catch (error) {
    //@ts-ignore
    console.error(error.toString());
  }
})();
