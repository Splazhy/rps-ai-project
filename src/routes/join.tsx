import { CgDice6 } from 'solid-icons/cg'
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import { createSignal, For, Match, onMount, Switch } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { getRooms, joinRoom } from '~/backend/room';
import { Room, userId, username } from '~/data/types';
import { ImBlocked } from 'solid-icons/im';
import { FaSolidArrowRightToBracket } from 'solid-icons/fa';
import { changeUsername } from '~/backend/user';

export default function Join() {
  const navigate = useNavigate();
  const [rooms, setRooms] = createSignal<Room[]>();
  async function refresh() {
    setRooms(await getRooms());
  }

  async function enterRoom(roomId: number) {
    await changeUsername(userId(), username());
    navigate(`/room/${roomId}`);
  }

  onMount(() => refresh());

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
                <For each={rooms()}>
                  {(room) => {
                    return (
                    <tr>
                      <th>{room.id}</th>
                      <td>{room.host.name}</td>
                      <td>{room.joined.size}/{room.capacity}</td>
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
              </tbody>
            </table>
          </div>
        </div>

        <div class='flex flex-1 mt-auto items-end gap-2'>
          <HomeButton />
          <A href='' class={`btn btn-wide btn-success font-mono text-base ${(rooms()?.length || 0) > 0 ? '' : 'btn-disabled'}`}>
            <CgDice6 />
            Join a random match
          </A>
        </div>

      </div>

      <Footer />

    </div>
  );
}