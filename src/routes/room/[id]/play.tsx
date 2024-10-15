import CameraPlaceholder from "~/components/CameraPlaceholder";
import Countdown from "~/components/Countdown";
import Footer from "~/components/Footer";

export default function PlayHuman() {
  return (
    <div class='flex flex-col min-h-screen items-center overflow-hidden font-mono p-4'>
      
      <Countdown />

      <div class='flex grow flex-col md:flex-row gap-8 md:gap-16 items-center justify-center'>
        <CameraPlaceholder />

        <div class='flex items-center justify-center border-slate-800 border-8 w-full max-w-[480px] bg-slate-500 rounded-3xl p-8'>
          <div class='text-4xl md:text-5xl text-slate-800 text-center'>
            Waiting...
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
