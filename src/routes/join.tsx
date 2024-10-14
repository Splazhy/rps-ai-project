import { CgDice6 } from 'solid-icons/cg'
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import JoinButton from "../components/JoinButton";
import { createSignal, For, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import { getRooms } from '~/backend/room';
import { Room } from "~/data/room";

export default function Join() {

  const [rooms, setRooms] = createSignal<Room[]>();
  async function refresh() {
    setRooms(await getRooms());
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
                  {(room, i) =>
                    <tr>
                      <th>{room.id}</th>
                      <td>{room.host.name}</td>
                      <td>{room.joined.size}/{room.capacity}</td>
                      <td><JoinButton disabled={!room.vacant}/></td>
                    </tr>
                  }
                </For>
              </tbody>
            </table>
          </div>
        </div>

        <div class='flex flex-1 mt-auto items-end gap-2'>
          <HomeButton />
          {/* TODO: disable this button when there's zero host */}
          <A href='' class={'btn btn-wide btn-success font-mono text-base'}>
            <CgDice6 />
            Join a random match
          </A>
        </div>

      </div>

      <Footer />

    </div>
  );
}