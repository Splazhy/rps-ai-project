// src/handlers/socketHandlers.ts

import { Hand, Match, MatchSettings, Room, RoomJoinResult, RoundResult, User } from "~/types/core";
import { sServer, sSocket } from "~/types/socket";
import { v4 as uuidv4 } from 'uuid';

const users: Record<string, User> = {};
const rooms: Record<string, Room> = {};
const matches: Record<string, Match> = {};

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

const rpsTable: Record<string, RoundResult> = {
  "rock-rock": "draw",
  "rock-paper": "lose",
  "rock-scissors": "win",
  "rock-lizard": "win",
  "rock-trident": "lose",
  "rock-gun": "lose",
  "paper-rock": "win",
  "paper-paper": "draw",
  "paper-scissors": "lose",
  "paper-lizard": "lose",
  "paper-trident": "win",
  "paper-gun": "lose",
  "scissors-rock": "lose",
  "scissors-paper": "win",
  "scissors-scissors": "draw",
  "scissors-lizard": "win",
  "scissors-trident": "lose",
  "scissors-gun": "lose",
  "lizard-rock": "lose",
  "lizard-paper": "win",
  "lizard-scissors": "lose",
  "lizard-lizard": "draw",
  "lizard-trident": "win",
  "lizard-gun": "lose",
  "trident-rock": "win",
  "trident-paper": "lose",
  "trident-scissors": "win",
  "trident-lizard": "lose",
  "trident-trident": "draw",
  "trident-gun": "lose",
  "gun-rock": "win",
  "gun-paper": "win",
  "gun-scissors": "win",
  "gun-lizard": "win",
  "gun-trident": "win",
  "gun-gun": "draw",
};

function getRoundResult(handA: Hand, handB: Hand): RoundResult {
  return rpsTable[`${handA}-${handB}`];
}

export function handleEverything(io: sServer, socket: sSocket) {

  socket.on("start-match", (roomId: string, settings: MatchSettings) => {
    rooms[roomId].playing = true;
    matches[roomId] = {
      roomId: roomId,
      rounds: [{
        handA: { userId: "", hand: "waiting" },
        handB: { userId: "", hand: "waiting" }
      }],
      settings: settings,
      scoreboard: {},
    };
    io.to(roomId).emit("match-started");
  });

  socket.on("enter-match", (userId) => {
    let user = users[userId];
    let roomId = user.roomId;
    if (roomId) {
      let match = matches[roomId];
      match.scoreboard[userId] = 0;
      socket.emit("match-entered");
    }
  });

  socket.on("play-hand", (userId, hand) => {
    let user = users[userId];
    let roomId = user.roomId;
    if (!roomId) return;
    let match = matches[roomId];
    if (!match) return;

    let round = match.rounds[match.rounds.length-1];
    let handA = round.handA;
    let handB = round.handB;
    if (handA.hand === "waiting") {
      handA.userId = userId;
      handA.hand = hand;
    }
    else if (handB.hand === "waiting") {
      handB.userId = userId;
      handB.hand = hand;
      let resultA = getRoundResult(handA.hand, handB.hand);
      let resultB = getRoundResult(handB.hand, handA.hand);
      if (resultA === "win") {
        match.scoreboard[handA.userId] += 1;
      }
      if (resultB === "win") {
        match.scoreboard[handB.userId] += 1;
      }
      let scoreA = match.scoreboard[handA.userId];
      let scoreB = match.scoreboard[handB.userId];
      let leader = Math.max(scoreA, scoreB);
      if (leader < match.settings.round) {
        match.rounds.push({
          handA: { userId: "", hand: "waiting" },
          handB: { userId: "", hand: "waiting" }
        });
        io.to(handA.userId).emit("round-done", resultA);
        io.to(handB.userId).emit("round-done", resultB);
      } else {
        io.to(handA.userId).emit("round-done", resultA);
        io.to(handB.userId).emit("round-done", resultB);
        setTimeout(() => {
          let winner = (scoreA > scoreB) ? handA.userId : handB.userId;
          io.to(handA.userId).emit("match-ended", winner);
          io.to(handB.userId).emit("match-ended", winner);
        }, 3000);
      }
    }
  });

  socket.on("abort-match", (roomId) => {
    delete matches[roomId];
    io.to(roomId).emit("match-aborted");
  })

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
      joined: [],
      capacity: 2,
      vacant: true,
      playing: false,
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
      let room = rooms[roomId];
      let user = users[uuid];
      if (room.joined.indexOf(user) == -1) {
        callback("full");
      } else if (room.host == user) {
        callback("existing-host");
        io.to(roomId).emit("room-data-changed", room);
      } else {
        callback("existing-member");
        io.to(roomId).emit("room-data-changed", room);
      }
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
          console.log("delete room");
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