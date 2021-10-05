import { sleep } from ".";

export const filterByName = <T extends { name: string }>(
  list: T[],
  value: string,
): T[] => {
  return list.filter((item) => item.name.includes(value));
};

export const sendHistory = async (history: {
  key: string;
  values: Record<string, any>;
}) => {
  await sleep(3000);
  throw Error(history.key);
};
