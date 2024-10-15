import { APIEvent } from "@solidjs/start/server";
import { Server } from "socket.io";
import { handleEverything } from "~/backend/socket-handlers";
import { SocketWithIO, sServer, sSocket } from "~/types/socket";


export async function GET({ request, nativeEvent }: APIEvent) {
  const socket = nativeEvent.node.res.socket as SocketWithIO | null;
  if (!socket) return;
  if (socket.server.io) {
    console.log("Socket is already running " + request.url, request);
  } else {
    console.log("Initializing Socket");

    const io: sServer = new Server(socket.server, {
      path: "/api/ws",
    });

    socket.server.io = io;

    io.on("connection", (socket: sSocket) => {
      handleEverything(io, socket);
    });

    return new Response();
  }
}