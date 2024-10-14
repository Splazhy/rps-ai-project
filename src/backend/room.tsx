"use server";

import { dummyRoom, Room } from "~/data/room";
import { getUser } from "./user";
import { User } from "~/data/user";


let rooms = new Map<number, Room>();

export async function createRoom(hostId: number): Promise<number> {
  let roomId;
  for (let i = 1; ; i++) {
    if (!rooms.has(i)) {
      roomId = i;
      let host = await getUser(hostId);
      let room: Room = {
        id: roomId,
        host: host,
        joined: new Set<User>([host]),
        capacity: 2,
        vacant: true,
      };
      rooms.set(roomId, room);
      break;
    }
  }
  return roomId;
}

export async function getRoom(roomId: number) {
  return rooms.get(roomId) || dummyRoom;
}

export async function joinRoom(roomId: number, userId: number) {
  let room = rooms.get(roomId);
  if (room === undefined) {
    return;
  }
  room.joined.add(await getUser(userId));
}

export async function leaveRoom(roomId: number, userId: number) {
    let room = rooms.get(roomId);
    if (room === undefined) {
      return;
    }

    if (room.host.id === userId) {
      removeRoom(roomId);
    }

    room.joined.delete(await getUser(userId));
}

export async function removeRoom(roomId: number) {
  rooms.delete(roomId);
}

export async function getRooms() {
  return rooms.values().toArray();
}
