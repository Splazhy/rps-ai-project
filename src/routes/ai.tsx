import { A } from "@solidjs/router";
import CameraPlaceholder from "../components/CameraPlaceholder";
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import RoundSelect from "../components/RoundSelect";
import { createSignal } from "solid-js";

export default function Ai() {

  const [round, setRound] = createSignal(3);
  const [useCamera, setUseCamera] = createSignal(false);

  return (
    <div class='min-h-screen flex flex-col overflow-hidden'>
      <div class='flex flex-wrap basis-0 grow gap-8 justify-center items-center py-8'>

      <CameraPlaceholder enabledChanged={setUseCamera}/>

      <div>
        <form name="round">
          <RoundSelect roundChanged={setRound}/>
        </form>
        <div class='flex items-center gap-2 my-4'>
          <HomeButton />
          <A href='/play_ai' class='btn btn-wide btn-primary font-mono text-base'>Start</A>
        </div>
      </div>

      </div>

      <Footer />

    </div>
  );
}