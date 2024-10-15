import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type {
  Server as IOServer,
  Server,
  Socket as SocketforServer,
} from "socket.io";
import type { Socket as SocketforClient } from "socket.io-client";
import { Room, User } from "./core";

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface ServerToClientEvents {
  "user-connected": (user: User) => void;
  "user-disconnected": (name: string) => void;
  "room-data-changed": (room: Room) => void;
  "room-record-changed": (rooms: Room[]) => void;
  "kicked-out": () => void;
}

export interface ClientToServerEvents {
  "request-user": (uuid: string, callback: (user: User) => void) => void;
  "change-username": (uuid: string, name: string) => void;
  "host-new-room": (host_uuid: string, callback: (room: Room) => void) => void;
  "join-room": (uuid: string, roomId: string, callback: (result: RoomJoinResult) => void) => void;
  "kick": (uuid: string) => void;
  "leave-room": (uuid: string) => void;
  "start-game": (roomId: string) => void;
  "get-all-rooms": (callback: (rooms: Room[]) => void) => void;
}

export type RoomJoinResult = "invalid-user-id" | "invalid-room-id" | "full" | "success";

interface InterServerEvents {
  // ping: () => void;
}

interface SocketData {
  // user: {
  //   id: string;
  //   username: string;
  // };
}

export type sServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
export type sSocket = SocketforServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type cSocket = SocketforClient<
  ServerToClientEvents,
  ClientToServerEvents
>;