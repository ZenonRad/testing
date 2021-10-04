export const sleep = async (timeMs: number) =>
  await new Promise((resolve) => setTimeout(resolve, timeMs));
