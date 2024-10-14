import { createSignal } from "solid-js";

export type User = {
  id: number,
  name: string,
};

export const dummyUser: User = {
  id: -1,
  name: "Unnamed",
};

export const [userId, setUserId] = createSignal(-1);
export const [username, setUsername] = createSignal("");