import HomeButton from "../components/HomeButton";
import Footer from "../components/Footer";
import RoundSelect from "../components/RoundSelect";
import KickButton from "../components/KickButton";
import { createEffect, createSignal } from "solid-js";
import CameraPlaceholder from "../components/CameraPlaceholder";

export default function Host() {
  const [joinedPlayers, setJoinedPlayers] = createSignal(2);
  const [requiredJoined, setRequiredJoined] = createSignal(2);
  const [isReady, setReady] = createSignal(false);

  createEffect(() => {
    setReady(joinedPlayers() === requiredJoined());
  });

  return (
    <div class='min-h-screen flex flex-col overflow-hidden'>
      <div class='flex flex-wrap basis-0 grow gap-8 justify-center items-center py-8'>

        <CameraPlaceholder/>

        <div class='min-w-fit'>
          <h1 class='text-center text-2xl font-mono'>Players (2/2)</h1>
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>John Doe (You)</td>
                <td><KickButton disabled={true} /></td>
              </tr>
              <tr>
                <th>2</th>
                <td>Jane Smith</td>
                <td><KickButton /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <form>
          <RoundSelect />
          <div class='flex items-center gap-2 my-4'>
            <HomeButton />
            {/* <input type='submit' disabled={!isReady()} class={'btn btn-wide btn-secondary font-mono text-base' + (isReady() ? '' : ' btn-disabled')} value={isReady() ? 'Start' : 'Waiting for players'}></input> */}
            <a href='/play_human' class='btn btn-wide btn-secondary font-mono text-base'>Start</a>
          </div>
        </form>

      </div>

      <Footer />

    </div>
  );
}