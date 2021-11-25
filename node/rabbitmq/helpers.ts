import { connect } from "amqp-connection-manager";

export const connectRabbitMQ = (amqpUrl: string) => {
  console.log(`Connecting...`);

  const connection = connect(amqpUrl);

  connection.on("connect", ({ url }) =>
    console.log(`Connected to AMQP ${url}`)
  );

  connection.on("disconnect", ({ err }) =>
    console.log(`Disconnected => ${err.toString()}`)
  );

  connection.on("blocked", ({ reason }) => console.log(`Blocked => ${reason}`));
  connection.on("unblocked", () => console.log(`Unblocked`));

  return connection;
};
