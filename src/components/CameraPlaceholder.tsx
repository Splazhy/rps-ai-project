import { IoCamera } from 'solid-icons/io';
import { createSignal, Match, Switch } from 'solid-js';
import CameraFeed from './CameraFeed';

export default function CameraPlaceholder() {
  let [cameraIsOn, setCameraOn] = createSignal(false);

  return (
    <>
      <div class='flex items-center justify-center border-slate-800 border-8 md:w-[480px] w-[80vw] bg-slate-500 rounded-3xl'>
        <Switch>
          <Match when={cameraIsOn()}>
            <CameraFeed />
          </Match>
          <Match when={!cameraIsOn()}>
            <button class='md:text-[12rem] text-[30vw] text-slate-800 text-center'>
              <IoCamera />
            </button>
          </Match>
        </Switch>
      </div>
      <input 
        type="checkbox" 
        class="toggle"
        checked={cameraIsOn()}
        onChange={(e) => setCameraOn(e.currentTarget.checked)}
      />
    </>
  );
}
