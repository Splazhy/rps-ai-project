import { dummyUser, User } from "./user";

export type Room = {
  id: number,
  host: User,
  joined: Set<User>,
  capacity: number,
  vacant: boolean,
};

export const dummyRoom: Room = {
  id: -1,
  host: dummyUser,
  joined: new Set([]),
  capacity: 420,
  vacant: false,
};