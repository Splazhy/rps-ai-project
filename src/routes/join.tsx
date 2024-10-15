import { CgDice6 } from 'solid-icons/cg';
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import { createSignal, For, Match, onMount, Show, Switch } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Room } from '~/types/core';
import { ImBlocked } from 'solid-icons/im';
import { FaSolidArrowRightToBracket } from 'solid-icons/fa';
import { socket } from '~/lib/socket';

export default function Join() {
  const navigate = useNavigate();
  const [rooms, setRooms] = createSignal<Room[]>();

  socket.on("room-record-changed", (rooms: Room[]) => {
    setRooms(rooms);
  });

  onMount(() => {
    socket.emit("get-all-rooms", (rooms: Room[]) => {
      setRooms(rooms);
    });
  });

  function enterRoom(roomId: string) {
    navigate(`/room/${roomId}`);
  }

  function joinRandom() {
    let allRooms = rooms();
    if (!allRooms) return;
    let availableRooms = allRooms.filter((room) => room.vacant);
    if (availableRooms.length === 0) return; // Check for available rooms
    enterRoom(availableRooms[Math.floor(Math.random() * availableRooms.length)].id);
  }

  return (
    <div class='min-h-screen flex flex-col overflow-hidden p-4 md:p-8'>

      <div class="flex flex-col mt-8 items-center gap-6">

        <div class='w-full'>
          <h1 class='text-center text-2xl font-mono'>Available Hosts</h1>
          <div class='overflow-x-auto'>
            <table class="table-auto w-full max-h-[70vh] overflow-scroll">
              <thead>
                <tr>
                  <th class="px-2 py-1">No.</th>
                  <th class="px-2 py-1">Host name</th>
                  <th class="px-2 py-1">Size</th>
                  <th class="px-2 py-1">Join</th>
                </tr>
              </thead>
              <tbody>
                <Show when={rooms()} keyed>
                  {(rooms) => (
                    <For each={rooms}>
                      {(room, i) => {
                        return (
                          <tr>
                            <td class="px-2 py-1">{i() + 1}</td>
                            <td class="px-2 py-1">{room.host.name}</td>
                            <td class="px-2 py-1">{room.joined.length}/{room.capacity}</td>
                            <td class="px-2 py-1">
                              <button onClick={() => enterRoom(room.id)} class={`font-mono text-base btn btn-sm btn-success ${!room.vacant ? 'btn-disabled' : ''}`}>
                                <Switch>
                                  <Match when={!room.vacant}>
                                    <ImBlocked class="inline mr-1" />
                                    Full
                                  </Match>
                                  <Match when={room.vacant}>
                                    <FaSolidArrowRightToBracket class="inline mr-1" />
                                    Join
                                  </Match>
                                </Switch>
                              </button>
                            </td>
                          </tr>
                        );
                      }}
                    </For>
                  )}
                </Show>

              </tbody>
            </table>
          </div>
        </div>

        <div class='flex flex-col md:flex-row mt-auto items-end gap-2'>
          <HomeButton />
          <button onClick={joinRandom} class={`btn btn-wide btn-success font-mono text-base ${rooms()?.length ? '' : 'btn-disabled'}`}>
            <CgDice6 class="inline mr-1" />
            Join a random match
          </button>
        </div>

      </div>

      <Footer />

    </div>
  );
}
