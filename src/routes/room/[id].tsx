import { createEffect, createSignal, For, Match, onCleanup, onMount, Switch } from "solid-js";
import { A, useNavigate, useParams } from "@solidjs/router";
import CameraPlaceholder from "~/components/CameraPlaceholder";
import KickButton from "~/components/KickButton";
import RoundSelect from "~/components/RoundSelect";
import HomeButton from "~/components/HomeButton";
import Footer from "~/components/Footer";
import { userId } from "../../data/user";
import { getRoom, leaveRoom } from "~/backend/room";
import { getUser } from "~/backend/user";
import { dummyRoom, Room } from "~/data/room";


export default function Host() {
  const navigate = useNavigate();
  const param = useParams();
  const [room, setRoom] = createSignal<Room>(dummyRoom);

  onMount(async () => {
    if (userId() === -1) {
      navigate("/");
    }
    setRoom(await getRoom(+param.id));
  });

  onCleanup(async () => {
    await leaveRoom(+param.id, userId());
  });

  const [isReady, setReady] = createSignal(false);

  createEffect(() => {
    setReady(room().joined.size === room().capacity);
  });



  return (
    <Switch>
      <Match when={room() === undefined}>
        <div class='text-3xl text-center m-4 flex flex-col items-center gap-8 h-[50vh] justify-center'>
          Error: Room not found
          <HomeButton />
        </div>
      </Match>
      <Match when={room() !== undefined}>
      <div class='min-h-screen flex flex-col overflow-hidden'>
      <div class='flex flex-wrap basis-0 grow gap-8 justify-center items-center py-8'>

        <CameraPlaceholder/>

        <div class='min-w-fit'>
          <h1 class='text-center text-2xl font-mono'>Players ({room().joined.size}/{room().capacity})</h1>
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <For each={room().joined.keys().toArray()}>
                { (user) => (
                  <tr>
                    <th>{user.id}</th>
                    <td>{user.name} {(userId() === user.id) ? "(You)" : ""}</td>
                    <td><KickButton disabled={userId() === user.id} /></td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        <div>
          <form name="round">
            <RoundSelect />
          </form>
          <div class='flex items-center gap-2 my-4'>
            <HomeButton />
            <input type='submit' disabled={!isReady()} class={'btn btn-wide btn-secondary font-mono text-base' + (isReady() ? '' : ' btn-disabled')} value={isReady() ? 'Start' : 'Waiting for players'}></input>
          </div>
        </div>

      </div>

      <Footer />

    </div>
      </Match>
    </Switch>
  );
}