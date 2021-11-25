import { ConfirmChannel } from "amqplib";

import { RABBITMQ_URL, WORK_QUEUE } from "../constants";
import { connectRabbitMQ } from "../helpers";

export const processTasks = async <T = any>(
  amqpUrl: string,
  queue: string,
  handler: (kwargs: T) => Promise<void>,
  {
    durableQueue = true,
    exclusiveQueue = false,
  }: {
    durableQueue?: boolean;
    exclusiveQueue?: boolean;
  } = {}
) => {
  console.log(`Enqueue task to queue "${queue}"`);

  const connection = connectRabbitMQ(amqpUrl);

  const channelWrapper = connection.createChannel({
    setup: (channel: ConfirmChannel) => {
      channel.assertQueue(queue, {
        durable: durableQueue,
        exclusive: exclusiveQueue,
      });

      channel.prefetch(1);
    },
  });

  await channelWrapper.consume(
    queue,
    (message) => {
      if (message?.content) {
        const kwargs: T = JSON.parse(message.content.toString());

        console.log(
          `\nReceived a message from queue ${queue} => ${JSON.stringify(
            kwargs,
            null,
            2
          )}`
        );

        handler(kwargs)
          .then(() => channelWrapper.ack(message))
          .catch((error) => {
            console.warn(
              `Error when processing task: ${String(
                error
              )}.\nMessage will be dropped.`
            );

            channelWrapper.ack(message);
          });
      }
    },
    { noAck: false }
  );

  connection.on("connect", () =>
    console.log(`Waiting for task to be queued in ${queue}...`)
  );
};

processTasks<{ index: number }>(RABBITMQ_URL, WORK_QUEUE, async (kwargs) => {
  await new Promise((resolve) =>
    setTimeout(resolve, kwargs.index % 2 ? 2000 : 1000)
  );
  console.log("Finished task %s", kwargs.index);
});
