import { CgDice6 } from 'solid-icons/cg'
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import { createEffect, createSignal, For, Match, onMount, Show, Switch } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Room } from '~/types/core';
import { ImBlocked } from 'solid-icons/im';
import { FaSolidArrowRightToBracket } from 'solid-icons/fa';
import { socket } from '~/lib/socket';

export default function Join() {
  const navigate = useNavigate();
  const [rooms, setRooms] = createSignal<Room[]>();
  const [canJoinAny, setCanJoinAny] = createSignal(false);

  socket.on("room-record-changed", (rooms: Room[]) => {
    setRooms(rooms);
  });

  onMount(() => {
    socket.emit("get-all-rooms", (rooms: Room[]) => {
      setRooms(rooms);
    });
  });

  createEffect(() => {
    let _rooms = rooms();
    if (_rooms) {
      let availableRooms = _rooms.filter((room => room.vacant));
      setCanJoinAny(availableRooms.length > 0);
    }
  });

  function enterRoom(roomId: string) {
    navigate(`/room/${roomId}`);
  }

  function joinRandom() {
    let _rooms = rooms();
    if (_rooms) {
      let availableRooms = _rooms.filter((room => room.vacant));
      enterRoom(availableRooms[Math.round(Math.random() * (availableRooms.length - 1))].id);
    }
  }

  return (
    <div class='min-h-screen flex flex-col overflow-hidden'>

      <div class="flex flex-col mt-8 items-center gap-8">

        <div>
          <h1 class='text-center text-2xl font-mono'>Available Hosts</h1>
          <div class='w-fit max-h-[70vh] overflow-scroll'>
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Host name</th>
                  <th>Size</th>
                  <th>Join</th>
                </tr>
              </thead>
              <tbody>
                <Show when={rooms()} keyed>
                  {(rooms) => (
                    <For each={rooms}>
                      {(room, i) => {
                        return (
                          <tr>
                            <th>{i() + 1}</th>
                            <td>{room.host.name}</td>
                            <td>{room.joined.length}/{room.capacity}</td>
                            <td>
                              <button onClick={() => enterRoom(room.id)} class={'font-mono text-base btn btn-sm btn-success' + (!room.vacant ? ' btn-disabled' : '')}>
                                <Switch>
                                  <Match when={!room.vacant}>
                                    <ImBlocked />
                                    Full
                                  </Match>
                                  <Match when={room.vacant}>
                                    <FaSolidArrowRightToBracket />
                                    Join
                                  </Match>
                                </Switch>
                              </button>
                            </td>
                          </tr>);
                      }}
                    </For>
                  )}
                </Show>

              </tbody>
            </table>
          </div>
        </div>

        <div class='flex flex-1 mt-auto items-end gap-2'>
          <HomeButton />
          <button onClick={joinRandom} class={`btn btn-wide btn-success font-mono text-base ${canJoinAny() ? '' : 'btn-disabled'}`}>
            <CgDice6 />
            Join a random match
          </button>
        </div>

      </div>

      <Footer />

    </div>
  );
}