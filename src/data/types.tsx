import { createSignal } from "solid-js";

export const dummyUser: User = {
  id: -1,
  name: "Unnamed",
};

export const dummyRoom: Room = {
  id: -1,
  host: dummyUser,
  joined: new Set([]),
  capacity: 420,
  vacant: false,
};

export type Room = {
  id: number,
  host: User,
  joined: Set<User>,
  capacity: number,
  vacant: boolean,
};

export type User = {
  id: number,
  name: string,
};


export const [userId, setUserId] = createSignal(-1);
export const [username, setUsername] = createSignal("");