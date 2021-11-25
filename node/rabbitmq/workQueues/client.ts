import { ConfirmChannel } from "amqplib";

import { RABBITMQ_URL, WORK_QUEUE } from "../constants";
import { connectRabbitMQ } from "../helpers";

export const enqueueTask = async <T = any>(
  amqpUrl: string,
  queue: string,
  kwargs: T,
  {
    durableQueue = true,
    exclusiveQueue = false,
    persistentMessage = true,
  }: {
    durableQueue?: boolean;
    exclusiveQueue?: boolean;
    persistentMessage?: boolean;
  } = {}
) => {
  console.log(`Enqueue task to queue "${queue}"`);

  const connection = connectRabbitMQ(amqpUrl);

  const channelWrapper = connection.createChannel({
    json: true,

    setup: (channel: ConfirmChannel) =>
      channel.assertQueue(queue, {
        durable: durableQueue,
        exclusive: exclusiveQueue,
      }),
  });

  await channelWrapper.sendToQueue(queue, kwargs, {
    persistent: persistentMessage,
  });

  console.log(`Message sent to queue "${queue}"`);

  connection.close();
};

const publishTask = async () => {
  for (let i = 0; i < 10; i++)
    await enqueueTask(RABBITMQ_URL, WORK_QUEUE, { index: i });

  console.log("[x] Messages sent");
};

publishTask();
