import { IoCamera } from 'solid-icons/io'
import { createEffect, createSignal, Match, Setter, Switch } from 'solid-js';
import CameraFeed from './CameraFeed';


export default function CameraPlaceholder(props: {
  enabledChanged?: Setter<boolean>
}) {

  const [disabled, setDisable] = createSignal(false);
  let [cameraIsOn, setCameraOn] = createSignal(false);
  createEffect(() => {
    if (props.enabledChanged) {
      props.enabledChanged(cameraIsOn());
    }
  })

  return (
    <>
      <div class='flex items-center justify-center border-slate-800 border-8 md:size-[480px] size-[80vw] bg-slate-500 rounded-3xl'>
        <Switch>
          <Match when={cameraIsOn()}>
            <CameraFeed setDisable={disabled} />
          </Match>
          <Match when={!cameraIsOn()}>
            <button class='md:text-[12rem] text-[30vw] text-slate-800 text-center'>
              <IoCamera />
            </button>
          </Match>
        </Switch>
      </div>
      <input type="checkbox" class="toggle"
        checked={cameraIsOn()}
        onChange={(e) => setCameraOn(e.currentTarget.checked)}
      />
    </>
  );
}