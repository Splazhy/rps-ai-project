import { createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import CameraPlaceholder from "~/components/CameraPlaceholder";
import RoundSelect from "~/components/RoundSelect";
import HomeButton from "~/components/HomeButton";
import Footer from "~/components/Footer";
import { FaSolidDoorOpen } from "solid-icons/fa";
import { socket } from "~/lib/socket";
import { Room, User } from "~/types/core";
import { RoomJoinResult } from "~/types/socket";

let userId: string = "";

export default function Host() {
  const navigate = useNavigate();

  const [isHost, setHost] = createSignal(false);
  const [hasJoined, setJoined] = createSignal(false);
  const [isFull, setFull] = createSignal(false);
  const [isKicked, setKicked] = createSignal(false);

  const [user, setUser] = createSignal<User>();
  const [room, setRoom] = createSignal<Room>();

  const [isReady, setReady] = createSignal(false);

  socket.on("room-data-changed", (room: Room) => {
    setRoom(room);
    setReady(!room.vacant);
  });

  socket.on("kicked-out", () => {
    setJoined(false);
    setKicked(true);
    socket.emit("leave-room", userId);
  });

  createEffect(() => {
    let userVal = user();
    let roomVal = room();
    if (userVal && roomVal) {
      setHost(roomVal.host.uuid === userVal.uuid);
    }
  });

  onMount(() => {
    userId = localStorage.getItem('userId') || "";
    let roomId = useParams().id;
    socket.emit("request-user", userId, (user: User) => {
      setUser(user);
      localStorage.setItem('userId', user.uuid);
      socket.emit("join-room", user.uuid, roomId, (success: RoomJoinResult) => {
        switch (success) {
          case "success":
            setJoined(true);
            break;
          case "full":
            setFull(true);
            break;
        }
      });
    });
  });

  onCleanup(() => {
    socket.emit("leave-room", userId);
  });

  function kick(uuid: string) {
    socket.emit("kick", uuid);
  }

  function startGame() {
    navigate("play");
  }

  return (
    <Switch>
      <Match when={!hasJoined()}>
        <div class='text-3xl text-center m-4 flex flex-col items-center gap-8 h-[50vh] justify-center'>
          <Show when={isFull() && !isKicked()}>
            Room is already full :(
          </Show>
          <Show when={!isFull() && !isKicked()}>
            Error: Room not found
          </Show>
          <Show when={isKicked()}>
            You got kicked
          </Show>
          <HomeButton />
        </div>
      </Match>
      <Match when={hasJoined()}>
        <div class='min-h-screen flex flex-col overflow-hidden'>
          <div class='flex flex-wrap basis-0 grow gap-8 justify-center items-center py-4 md:py-8'>

            <CameraPlaceholder />

            <Show when={user()} keyed>
              {(user: User) => (
                <Show when={room()} keyed>
                  {(room: Room) => (
                    <div class='min-w-fit'>
                      <h1 class='text-center text-2xl font-mono'>Players ({room.joined.length}/{room.capacity})</h1>
                      <table class="table table-zebra w-full md:w-auto">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <For each={Array.from(room.joined)}>
                            {(u, i) => (
                              <tr>
                                <th>{i() + 1}</th>
                                <td>{u.name} {(user.uuid === u.uuid) ? "(You)" : ""}</td>
                                <td>
                                  <button onClick={() => kick(u.uuid)} class={'font-mono text-base btn btn-error btn-sm' + ((!isHost() || user.uuid === u.uuid) ? ' btn-disabled' : '')}>
                                    <FaSolidDoorOpen />
                                    Kick
                                  </button>
                                </td>
                              </tr>
                            )}
                          </For>
                        </tbody>
                      </table>
                    </div>
                  )}
                </Show>
              )}
            </Show>

            <div class='flex flex-col items-center'>
              <Show when={isHost()}>
                <form name="round">
                  <RoundSelect />
                </form>
              </Show>
              <div class='flex flex-col items-center gap-2 my-4'>
                <HomeButton />
                <Show when={isHost()}>
                  <button onClick={startGame} class={'btn btn-wide btn-secondary font-mono text-base' + (isReady() ? '' : ' btn-disabled')}>
                    {isReady() ? 'Start' : 'Waiting for players'}
                  </button>
                </Show>
                <Show when={!isHost()}>
                  <p>Waiting for host to start...</p>
                </Show>
              </div>
            </div>

          </div>

          <Footer />

        </div>
      </Match>
    </Switch>
  );
}
