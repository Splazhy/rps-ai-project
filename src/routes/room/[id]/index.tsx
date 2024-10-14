import { createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import CameraPlaceholder from "~/components/CameraPlaceholder";
import RoundSelect from "~/components/RoundSelect";
import HomeButton from "~/components/HomeButton";
import Footer from "~/components/Footer";
import { getRoom, joinRoom, leaveRoom } from "~/backend/room";
import { dummyRoom, Room, userId } from "~/data/types";
import { FaSolidDoorOpen } from "solid-icons/fa";


export default function Host() {
  const navigate = useNavigate();
  const param = useParams();
  const [room, setRoom] = createSignal<Room>(dummyRoom);

  const [isHost, setHost] = createSignal(false);
  const [isReady, setReady] = createSignal(false);
  let isFull: boolean = false;

  // HACK: manual refreshing
  async function refresh() {
    setRoom(await getRoom(+param.id));
  }

  function startGame() {
    navigate("play");
  }

  onMount(async () => {
    if (userId() === -1) {
      navigate("/");
    }
    setRoom(await getRoom(+param.id));
    isFull = !(await joinRoom(room().id, userId()));
    setHost(room().host.id === userId());
    await refresh();
  });

  onCleanup(async () => {
    await leaveRoom(+param.id, userId());
  });

  createEffect(() => {
    setReady(room().joined.size === room().capacity);
  });

  return (
    <Switch>
      <Match when={room().id === -1}>
        <div class='text-3xl text-center m-4 flex flex-col items-center gap-8 h-[50vh] justify-center'>
          Error: Room not found
          <HomeButton />
        </div>
      </Match>
      <Match when={isFull}>
        <div class='text-3xl text-center m-4 flex flex-col items-center gap-8 h-[50vh] justify-center'>
          This room is already full.
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
                    <td>
                      <button class={'font-mono text-base btn btn-error btn-sm' + ((!isHost() || userId() === user.id) ? ' btn-disabled' : '')}>
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

        <div>
          <Show when={isHost()}>
            <form name="round">
              <RoundSelect />
            </form>
          </Show>
          <div class='flex items-center gap-2 my-4'>
            <HomeButton />
            <button onClick={refresh} class='btn font-mono text-base'>Refresh</button>
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