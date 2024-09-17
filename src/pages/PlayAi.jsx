import { FaSolidRobot } from 'solid-icons/fa'
import CameraPlaceholder from "../components/CameraPlaceholder";
import Footer from "../components/Footer";
import Countdown from '../components/Countdown';

export default function PlayAi() {
  return (
    <div class='flex flex-col min-h-screen items-center overflow-hidden font-mono'>

      <Countdown />

      <div class='flex grow gap-48 items-center'>
        <CameraPlaceholder />

        <div class='flex items-center justify-center border-slate-800 border-8 md:size-[480px] size-[80vw] bg-slate-500 rounded-3xl'>
          <div class='md:text-[12rem] text-[30vw] text-slate-800 text-center'>
            <FaSolidRobot />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}