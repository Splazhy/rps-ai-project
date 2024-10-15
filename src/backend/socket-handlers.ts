// src/handlers/socketHandlers.ts

import { Room, User } from "~/types/core";
import { RoomJoinResult, sServer, sSocket } from "~/types/socket";
import { v4 as uuidv4 } from 'uuid';

const users: Record<string, User> = {};
const rooms: Record<string, Room> = {};
var roomsGenerated: number = 0;

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function generateNewRoom(): string {
  const prime = 31;  // A small prime number for modular arithmetic
  const largePrime = 1000000007;  // A large prime for reducing collision

  // Simple bit-shift transformation with modular arithmetic
  let hashed: number = ((roomsGenerated ^ prime) * prime) % largePrime;
  roomsGenerated += 1;

  // Ensure the hashed value is positive
  if (hashed < 0) {
    hashed += largePrime;
  }

  let roomId: string = hashed.toString();
  if (roomId.length < 6) {
    roomId = "0".repeat(6 - roomId.length) + roomId;
  }

  return roomId;
}

export function handleEverything(io: sServer, socket: sSocket) {
  socket.on("request-user", (uuid: string, callback: (user: User) => void) => {
    if (uuid === "") { // localStorage is empty, generate new uuid
      uuid = uuidv4();
    }
    if (!users[uuid]) { // create new user if uuid doesn't exist
      users[uuid] = {
        uuid: uuid,
        name: "",
        roomId: undefined,
      };
    }
    socket.join(uuid);
    callback(users[uuid]);
  }); // request-user
  socket.on("host-new-room", (host_uuid: string, callback: (room: Room) => void) => {
    let roomId = generateNewRoom();
    rooms[roomId] = {
      id: roomId,
      host: users[host_uuid],
      // joined: new Set<User>([]),
      joined: [],
      capacity: 2,
      vacant: true,
    };
    callback(rooms[roomId]);
    io.emit("room-record-changed", Object.values(rooms));
  }); // host-new-room

  socket.on("join-room", (uuid, roomId, callback: (success: RoomJoinResult) => void) => {
    if (!rooms[roomId]) {
      callback("invalid-room-id");
    } else if (!users[uuid]) {
      callback("invalid-user-id");
    } else if (!rooms[roomId].vacant) {
      callback("full");
    } else {
      let room: Room = rooms[roomId];
      let user: User = users[uuid];
      room.joined.push(user);
      room.vacant = room.joined.length < room.capacity;
      user.roomId = roomId;
      rooms[roomId] = room;
      socket.join(roomId);

      callback("success");
      io.to(roomId).emit("room-data-changed", room);
      io.emit("room-record-changed", Object.values(rooms));
    }
  });

  socket.on("get-all-rooms", (callback: (rooms: Room[]) => void) => {
    callback(Object.values(rooms));
  });

  socket.on("kick", (uuid: string) => {
    io.to(uuid).emit("kicked-out");
  });

  socket.on("leave-room", (uuid: string) => {
    let user = users[uuid];
    if (user && user.roomId) {
      let room = rooms[user.roomId];
      removeItem(room.joined, user);
      room.vacant = room.joined.length < room.capacity;
      user.roomId = undefined;
      io.to(room.id).emit("room-data-changed", room);
      if (room.host == user) {
        if (room.joined.length > 0) {
          room.host = room.joined[0];
        } else {
          delete rooms[room.id];
        }
      }
      io.emit("room-record-changed", Object.values(rooms));
    }
  });

  socket.on("change-username", (uuid, name) => {
    if (!users[uuid]) {
      console.log(`user ${uuid} doesn't exist`);
      return;
    }
    users[uuid].name = name;
  }); // change-username

  socket.on("disconnect", (uuid) => {
    socket.emit("user-disconnected", uuid);
  });
}